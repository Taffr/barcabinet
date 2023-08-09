import type { Ingredient } from './ingredient.interface'
export type Recipe = {
  id: string,
  name: string,
  preparation: string,
  ingredients: Ingredient[],
}
