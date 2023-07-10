import { Controller, Get, Param } from '@nestjs/common';
import { RecipeStore } from './recipestore.service';

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
}
