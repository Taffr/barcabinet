import type { Ingredient } from './ingredient.interface';

export interface ResolvedRecipe {
  id: number;
  name: string;
  garnish: string | null;
  preparation: string;
  ingredients: Ingredient[];
}
