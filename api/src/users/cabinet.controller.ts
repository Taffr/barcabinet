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
import { User, Ingredient } from '@prisma/client';
import { isEmpty, identity } from 'ramda';
import { UpdateIngredientsDTO } from './dtos/update-ingredients.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecipeStore } from '../recipes/recipe.store';
import { UserStore } from '../users/user.store';

@Controller('cabinet')
export class CabinetController {
  constructor(
    readonly userStore: UserStore,
    readonly recipeStore: RecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCabinetForUser(@Request() req: { user: User }): Promise<Ingredient[]> {
    const { id } = req.user;
    return this.userStore.getCabinetForUser(id);
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
      action === 'add'
        ? await this.userStore.addToUserCabinet(user.id, id)
        : await this.userStore.removeFromUserCabinet(user.id, id)
    ).match(identity, () => {
      throw new ConflictException('Ingredient already in cabinet');
    });
  }
}
