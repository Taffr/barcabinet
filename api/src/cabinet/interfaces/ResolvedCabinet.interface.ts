import { Ingredient } from '../../recipes/interfaces/ingredient.interface';
import { Recipe } from '../../recipes/documents/recipe.document';

export interface ResolvedCabinet {
  ownerId: string;
  favourites: Pick<Recipe, 'id' | 'name'>[];
  ingredients: Ingredient[];
}
