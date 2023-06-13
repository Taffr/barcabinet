import { createCollection } from '../create-collection.js'
import { dbFind } from '../methods/db-find.js'

const recipeCollection = createCollection('recipes', {
  find: dbFind
})

export { recipeCollection } 
