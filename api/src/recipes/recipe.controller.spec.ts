import { Test, TestingModule } from '@nestjs/testing';
import { map } from 'ramda';
import { Maybe } from '../util/Maybe';
import { RecipeController } from './recipe.controller';
import { RecipeStore } from './recipe.store';
import { IRecipeStore } from './interfaces/recipe.store.interface';
import { Recipe } from './documents/recipe.document';

describe('RecipeController', () => {
  let recipeController: RecipeController;

  const mockRecipeStore: IRecipeStore = {
    add(doc: Recipe) {
      return Promise.resolve(doc.id);
    },

    getAll() {
      const r = [
        {
          name: 'A Cocktail',
        },
      ] as Recipe[];
      return Promise.resolve(r);
    },

    findById(id) {
      return Promise.resolve(Maybe.of(id));
    },

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    findByIds(ids) {
      return Promise.resolve([]);
    },

    getContainingIngredientId(ingredientId: number) {
      return Promise.resolve([
        {
          name: 'Another Cocktail',
          ingredients: [{ id: ingredientId }],
        },
      ] as Recipe[]);
    },

    getContainingIngredientIds(ingredientIds: number[]) {
      return Promise.resolve(
        map(
          (id) =>
            ({
              id: 'some id',
              name: 'Another Cocktail',
              ingredients: [{ id }],
            } as Recipe),
          ingredientIds,
        ),
      );
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
      const res = await recipeController.containingIngredient(0);
      expect(res[0].ingredients.some(({ id }) => id === 0)).toBe(true);
    });
  });
});
