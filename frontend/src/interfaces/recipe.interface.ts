import type { Ingredient } from './ingredient.ts'
export type Recipe = {
  _id: string,
  name: string,
  preparation: string,
  ingredients: Ingredient[],
}
