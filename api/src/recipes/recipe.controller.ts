import { Controller, Get, Param } from '@nestjs/common';
import { RecipeStore } from './recipestore.service';
import { Ingredient } from './interfaces/ingredient.interface';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeStore: RecipeStore) {}

  @Get()
  getAll() {
    return this.recipeStore.getAll();
  }

  @Get('ingredient/:id')
  containingIngredient(@Param('id') id: string) {
    return this.recipeStore.containingIngredient(Number(id));
  }

  @Get('ingredients')
  async allIngredients(): Promise<Ingredient[]> {
    const allRecipes = await this.recipeStore.getAll();
    const allIngredients = allRecipes.flatMap(({ ingredients }) => ingredients);
    return [...new Set(allIngredients)];
  }
}
