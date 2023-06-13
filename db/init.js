const ingredientsIndex = {
  'name': 1,
  'ingredients.id': 1,
  'ingredients.name': 1,
}

const cocktailFileRaw = fs.readFileSync('/docker-entrypoint-initdb.d/cocktails.json', 'utf-8')
const cocktails = JSON.parse(cocktailFileRaw)

const db = db.getSiblingDB('barcabinet')
db.createCollection('recipes')
db.recipes.createIndex(ingredientsIndex)
db.recipes.insertMany(cocktails)

