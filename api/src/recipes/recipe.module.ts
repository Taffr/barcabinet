import { Module } from '@nestjs/common';
import { RecipeStore } from './recipestore.service';
import { RecipeController } from './recipe.controller';

@Module({
  controllers: [RecipeController],
  providers: [RecipeStore],
})
export class RecipeModule {}