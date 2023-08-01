import { Ingredient } from '../interfaces/ingredient.interface';

export class Recipe {
  static collectionName = 'recipes';

  id: string;
  name: string;
  ingredients: Ingredient[];
  preparation: string;
  garnish?: string;
}
