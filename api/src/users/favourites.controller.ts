import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { identity } from 'ramda';
import { RecipeStore } from '../recipes/recipe.store';
import { IRecipeStore } from '../recipes/interfaces/recipe.store.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateFavouritesDTO } from './dtos/update-favourites.dto';
import { User } from '../users/documents/user.document';
import { IFavouritesStore } from './interfaces/favourites.store.interface';
import { FavouritesStore } from './favourites.store';
import type { Recipe } from '../recipes/documents/recipe.document';

@Controller('favourites')
export class FavouritesController {
  constructor(
    @Inject(FavouritesStore)
    private readonly favouritesStore: IFavouritesStore,
    @Inject(RecipeStore)
    private readonly recipeStore: IRecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavouritesForUser(
    @Request() req: { user: User },
  ): Promise<Recipe[]> {
    const { id } = req.user;
    const maybeFavourites = await this.favouritesStore.getFavouritesForUser(id);

    return maybeFavourites
      .mapAsync((ids) => this.recipeStore.findByIds(ids))
      .then((m) =>
        m.match(identity, () => {
          throw new NotFoundException();
        }),
      );
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateFavourites(
    @Request() req: { user: User },
    @Body() updateFavouritesDTO: UpdateFavouritesDTO,
  ): Promise<Recipe[]> {
    const { user } = req;
    const { id, action } = updateFavouritesDTO;
    const maybeRecipe = await this.recipeStore.findById(id);
    return maybeRecipe
      .chainAsync((r) =>
        action === 'add'
          ? this.favouritesStore.addToUserFavourites(user.id, r.id)
          : this.favouritesStore.removeFromUserFavourites(user.id, r.id),
      )
      .then((m) =>
        m.match(
          (ids) => this.recipeStore.findByIds(ids),
          () => {
            throw new NotFoundException();
          },
        ),
      );
  }
}
