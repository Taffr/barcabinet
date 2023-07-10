import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeStore } from './recipestore.service';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [RecipeStore],
})
export class AppModule {}
