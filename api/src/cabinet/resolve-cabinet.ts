import { assoc, chain, prop, pick, map, reduce } from 'ramda';
import { Cabinet } from './documents/cabinet.document';
import { Recipe } from '../recipes/documents/recipe.document';
import { ResolvedCabinet } from './interfaces/ResolvedCabinet.interface';

export const resolveCabinet = (
  cabinet: Cabinet,
  favouriteRecipes: Recipe[],
  recipesContainingIngredients: Recipe[],
): ResolvedCabinet => {
  const ingredientIdToNameMap = reduce(
    (acc, { id, name }) => {
      return assoc(id, name, acc);
    },
    {},
    chain(prop('ingredients'), recipesContainingIngredients),
  );

  const resolvedFavourites = map(pick(['id', 'name']), favouriteRecipes);
  const resolvedIngredients = map(
    (id) => ({ id, name: ingredientIdToNameMap[id] }),
    cabinet.ingredients,
  );

  return {
    ownerId: cabinet.ownerId,
    favourites: resolvedFavourites,
    ingredients: resolvedIngredients,
  };
};
