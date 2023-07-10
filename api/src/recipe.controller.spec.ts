import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { AppService } from './app.service';
import { RecipeStore } from './recipestore.service';

describe('RecipeController', () => {
  let recipeController: RecipeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [AppService, RecipeStore],
    }).compile();

    recipeController = app.get<RecipeController>(RecipeController);
  });

  describe('getAll()', () => {
    it('should return all recipes', () => {
      expect(recipeController.getAll().length).toBeGreaterThan(1);
    });
  });

  describe('containingIngredient()', () => {
    it('should return nothing for non exisiting ingredient id', () => {
      expect(recipeController.containingIngredient('-1')).toStrictEqual([]);
    });

    it('should return a recipe when asking for an ingredient', () => {
      expect(
        recipeController.containingIngredient('0').length,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
