import { assoc, chain, prop, reduce } from 'ramda';
import { Recipe } from '../recipes/documents/recipe.document';
import { Ingredient } from 'src/recipes/interfaces/ingredient.interface';

export const resolveCabinet = (
  ingredientIds: number[],
  recipes: Recipe[],
): Ingredient[] => {
  const ingredientIdToNameMap = reduce(
    (acc, { id, name }) => {
      return assoc(id, name, acc);
    },
    {},
    chain(prop('ingredients'), recipes),
  );

  const resolvedIngredients = reduce(
    (acc, id) => {
      if (!ingredientIdToNameMap[id]) {
        return acc;
      }
      acc.push({ id, name: ingredientIdToNameMap[id] });
      return acc;
    },
    [] as Ingredient[],
    ingredientIds,
  );

  return resolvedIngredients;
};
