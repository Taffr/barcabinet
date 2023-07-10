import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeStore } from './recipestore.service';

describe('RecipeController', () => {
  let recipeController: RecipeController;

  const mockRecipeStore = {
    getAll() {
      return Promise.resolve([
        {
          name: 'A Cocktail',
        },
      ]);
    },
    containingIngredient(ingredientId: number) {
      return Promise.resolve([
        {
          name: 'Another Cocktail',
          ingredients: [{ id: ingredientId }],
        },
      ]);
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
    it('should return all recipes', async () => {
      const res = await recipeController.getAll();
      expect(res.length).toBeGreaterThan(0);
    });
  });

  describe('containingIngredient(id)', () => {
    it('should return a recipe when asking for an ingredient', async () => {
      const res = await recipeController.containingIngredient('0');
      expect(res[0].ingredients.some(({ id }) => id === 0)).toBe(true);
    });
  });
});
