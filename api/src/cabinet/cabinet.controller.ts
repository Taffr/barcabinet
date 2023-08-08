import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Patch,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { identity } from 'ramda';
import { Cabinet } from './documents/cabinet.document';
import { ResolvedCabinet } from './interfaces/ResolvedCabinet.interface';
import { CabinetStore } from './cabinet.store';
import { ICabinetStore } from './interfaces/cabinet.store.interface';
import { RecipeStore } from '../recipes/recipe.store';
import { IRecipeStore } from '../recipes/interfaces/recipe.store.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCabinetDTO } from './dtos/update-cabinet.dto';
import { UpdateFavouritesDTO } from './dtos/update-favourites.dto';
import { resolveCabinet } from './resolve-cabinet';
import { User } from '../users/documents/user.document';

@Controller('cabinet')
export class CabinetController {
  constructor(
    @Inject(CabinetStore)
    private readonly cabinetStore: ICabinetStore,
    @Inject(RecipeStore)
    private readonly recipeStore: IRecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCabinetForOwner(
    @Request() req: { user: User },
  ): Promise<ResolvedCabinet> {
    const { id } = req.user;
    const maybeCabinet = await this.cabinetStore.getForOwner(id);
    return (
      await maybeCabinet.mapAsync(async (cabinet) => {
        const favRecipes = await this.recipeStore.findByIds(cabinet.favourites);
        const recipesContainingIngredients =
          await this.recipeStore.getContainingIngredientIds(
            cabinet.ingredients,
          );
        return resolveCabinet(
          cabinet,
          favRecipes,
          recipesContainingIngredients,
        );
      })
    ).match(identity, () => {
      throw new NotFoundException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCabinet(
    @Request() req: { user: User },
    @Body() updateCabinetDTO: UpdateCabinetDTO,
  ): Promise<Cabinet> {
    const { id } = req.user;
    const maybeCabinet = await this.cabinetStore.updateForOwner(
      id,
      updateCabinetDTO,
    );
    return maybeCabinet.match(identity, () => {
      throw new NotFoundException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('favourites')
  updateFavourites(
    @Request() req: { user: User },
    @Body() updateFavouritesDTO: UpdateFavouritesDTO,
  ): Promise<Cabinet> {
    const { user } = req;
    const { id, action } = updateFavouritesDTO;
    return this.recipeStore.findById(id).then((mRecipe) =>
      mRecipe
        .chainAsync((r) =>
          action === 'add'
            ? this.cabinetStore.addToFavourites(user.id, r.id)
            : this.cabinetStore.removeFromFavourites(user.id, r.id),
        )
        .then((m) =>
          m.match(identity, () => {
            throw new NotFoundException(`No recipe with id ${id}`);
          }),
        ),
    );
  }
}
