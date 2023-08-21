import { Test, TestingModule } from '@nestjs/testing';
import { map } from 'ramda';
import { Maybe } from '../util/Maybe';
import { RecipeController } from './recipe.controller';
import { RecipeStore } from './recipe.store';
import { Recipe } from '@prisma/client';

describe('RecipeController', () => {
  let recipeController: RecipeController;

  const mockRecipeStore = {
    getAll(): Promise<Recipe[]> {
      const r = [
        {
          id: 0,
          name: 'A Cocktail',
          garnish: null,
          preparation: 'prep',
        },
      ];
      return Promise.resolve(r);
    },

    findById(id: number): Promise<Maybe<Recipe>> {
      const r: Recipe = {
        id,
        name: 'name',
        garnish: null,
        preparation: 'prep',
      };
      return Promise.resolve(Maybe.of(r));
    },

    findByIds(ids: number[]) {
      const recipes: Recipe[] = map(
        (id) => ({
          id,
          name: 'a name',
          garnish: null,
          preparation: 'p',
        }),
        ids,
      );
      return Promise.resolve(recipes);
    },

    getContainingIngredientId(ingredientId: number): Promise<Recipe[]> {
      return this.getContainingIngredientIds([ingredientId]);
    },

    getContainingIngredientIds(ingredientIds: number[]): Promise<Recipe[]> {
      return Promise.resolve(
        map(
          (id) => ({
            id: id + 1,
            name: 'Another Cocktail',
            garnish: null,
            preparation: 'prep',
          }),
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
});
