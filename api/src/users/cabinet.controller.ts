import {
  Body,
  Controller,
  Get,
  NotFoundException,
  ConflictException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { isEmpty, prop } from 'ramda';
import { UpdateIngredientsDTO } from './dtos/update-ingredients.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CabinetStore } from './cabinet.store';
import { RecipeStore } from '../recipes/recipe.store';
import { User } from '@prisma/client';

@Controller('cabinet')
export class CabinetController {
  constructor(
    readonly cabinetStore: CabinetStore,
    readonly recipeStore: RecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCabinetForUser(@Request() req: { user: User }): Promise<number[]> {
    const { id } = req.user;
    return this.cabinetStore.getCabinetForUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateIngredients(
    @Request() req: { user: User },
    @Body() updateIngredientsDTO: UpdateIngredientsDTO,
  ): Promise<number> {
    const { user } = req;
    const { id, action } = updateIngredientsDTO;
    const recipesWithIngredients =
      await this.recipeStore.getContainingIngredientId(id);

    if (isEmpty(recipesWithIngredients)) {
      throw new NotFoundException(`No ingredient with id: ${id}`);
    }
    return (
      action === 'add'
        ? await this.cabinetStore.addToUserCabinet(user.id, id)
        : await this.cabinetStore.removeFromUserCabinet(user.id, id)
    ).match(prop('ingredientId'), () => {
      throw new ConflictException('Ingredient already in cabinet');
    });
  }
}
