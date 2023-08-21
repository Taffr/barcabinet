import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Recipe, User, Favourite } from '@prisma/client';
import { identity } from 'ramda';
import { RecipeStore } from '../recipes/recipe.store';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateFavouritesDTO } from './dtos/update-favourites.dto';
import { FavouritesStore } from './favourites.store';

@Controller('favourites')
export class FavouritesController {
  constructor(
    private readonly favouritesStore: FavouritesStore,
    private readonly recipeStore: RecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavouritesForUser(
    @Request() req: { user: User },
  ): Promise<Recipe[]> {
    const { id } = req.user;
    const favourites = await this.favouritesStore.getFavouritesForUser(id);
    return this.recipeStore.findByIds(favourites);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateFavourites(
    @Request() req: { user: User },
    @Body() updateFavouritesDTO: UpdateFavouritesDTO,
  ): Promise<Favourite> {
    const { user } = req;
    const { id, action } = updateFavouritesDTO;
    const maybeRecipe = await this.recipeStore.findById(id);

    return maybeRecipe
      .chainAsync((r: Recipe) =>
        action === 'add'
          ? this.favouritesStore.addToUserFavourites(user.id, r.id)
          : this.favouritesStore.removeFromUserFavourites(user.id, r.id),
      )
      .then((m) =>
        m.match(identity, () => {
          throw new NotFoundException();
        }),
      );
  }
}
