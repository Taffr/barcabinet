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
import { isEmpty, identity } from 'ramda';
import { UpdateIngredientsDTO } from './dtos/update-ingredients.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CabinetStore } from './cabinet.store';
import { RecipeStore } from '../recipes/recipe.store';
import { resolveCabinet } from './resolve-cabinet';
import type { IRecipeStore } from '../recipes/interfaces/recipe.store.interface';
import type { ICabinetStore } from './interfaces/cabinet.store.interface';
import type { Ingredient } from '../recipes/interfaces/ingredient.interface';
import type { User } from './documents/user.document';

@Controller('cabinet')
export class CabinetController {
  constructor(
    @Inject(CabinetStore)
    readonly cabinetStore: ICabinetStore,
    @Inject(RecipeStore)
    readonly recipeStore: IRecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCabinetForUser(
    @Request() req: { user: User },
  ): Promise<Ingredient[]> {
    const { id } = req.user;
    const maybeIngredients = await this.cabinetStore.getCabinetForUser(id);
    return maybeIngredients
      .mapAsync(async (ids) => {
        const recipes = await this.recipeStore.getContainingIngredientIds(ids);
        return resolveCabinet(ids, recipes);
      })
      .then((m) =>
        m.match(identity, () => {
          throw new NotFoundException();
        }),
      );
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateIngredients(
    @Request() req: { user: User },
    @Body() updateIngredientsDTO: UpdateIngredientsDTO,
  ): Promise<number[]> {
    const { user } = req;
    const { id, action } = updateIngredientsDTO;
    const recipesWithIngredients =
      await this.recipeStore.getContainingIngredientId(id);

    if (isEmpty(recipesWithIngredients)) {
      throw new NotFoundException(`No ingredient with id: ${id}`);
    }

    return (
      await (action === 'add'
        ? this.cabinetStore.addToUserCabinet(user.id, id)
        : this.cabinetStore.removeFromUserCabinet(user.id, id))
    ).match(identity, () => {
      throw new NotFoundException(`User not found`);
    });
  }
}
