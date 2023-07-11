import { Ingredient } from '../interfaces/ingredient.interface';

export class Recipe {
  static collectionName = 'recipes';

  name: string;
  ingredients: Ingredient[];
  preparation: string;
  garnish?: string;
}
