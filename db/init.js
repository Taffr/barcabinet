const ingredientsIndex = {
  'name': 1,
  'ingredients.id': 1,
  'ingredients.name': 1,
}

db = db.getSiblingDB('barcabinet')
db.createCollection('recipes')
db.recipes.createIndex(ingredientsIndex)

load('/docker-entrypoint-initdb.d/cocktails.json')

