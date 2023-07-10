import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeStore } from './recipestore.service';

describe('RecipeController', () => {
  let recipeController: RecipeController;
  const mockRecipeStore = {
    getAll() {
      return [
        {
          name: 'A Cocktail',
        },
      ];
    },
    containingIngredient(ingredientId: number) {
      return [
        {
          name: 'Another Cocktail',
          ingredients: [{ id: ingredientId }],
        },
      ];
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeStore,
          useValue: mockRecipeStore,
        },
      ],
    }).compile();

    recipeController = app.get<RecipeController>(RecipeController);
  });

  describe('getAll()', () => {
    it('should return all recipes', () => {
      expect(recipeController.getAll().length).toBeGreaterThan(0);
    });
  });

  describe('containingIngredient()', () => {
    it('should return a recipe when asking for an ingredient', () => {
      expect(
        recipeController
          .containingIngredient('0')[0]
          .ingredients.some(({ id }) => id === 0),
      ).toBe(true);
    });
  });
});
