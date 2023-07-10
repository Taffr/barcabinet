import { Module } from '@nestjs/common';
import { RecipeStore } from './recipestore.service';
import { RecipeController } from './recipe.controller';
import { Recipe, RecipeSchema } from '../schemas/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recipe.name,
        schema: RecipeSchema,
      },
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeStore],
})
export class RecipeModule {}
