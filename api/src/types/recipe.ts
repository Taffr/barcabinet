import type { ObjectId } from 'mongodb'
import type { Ingredient } from './ingredient.js'

export interface Recipe {
  _id: ObjectId
  name: string
  ingredients: Ingredient[]
  description: string
  garnish?: string
}
