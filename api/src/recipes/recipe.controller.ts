import { Controller, Get, Param } from '@nestjs/common';
import { RecipeStore } from './recipe.store';
import { Ingredient } from './interfaces/ingredient.interface';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeStore: RecipeStore) {}

  @Get()
  async getAll() {
    return this.recipeStore.getAll();
  }

  @Get('ingredient/:id')
  async containingIngredient(@Param('id') id: string) {
    return this.recipeStore.getContainingIngredientId(Number(id));
  }

  @Get('ingredients')
  async allIngredients(): Promise<Ingredient[]> {
    return this.recipeStore.getAllIngredients();
  }
}
