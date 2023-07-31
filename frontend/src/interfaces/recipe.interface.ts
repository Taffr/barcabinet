import type { Ingredient } from './ingredient.interface'
export type Recipe = {
  _id: string,
  name: string,
  preparation: string,
  ingredients: Ingredient[],
}
