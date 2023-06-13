import { readFileSync, writeFileSync } from 'fs'

function main() {
  const oldRecipes = JSON.parse(readFileSync('./cocktails_2.0.json', 'utf-8'))
  const allIngredients = [ ... new Set(oldRecipes.flatMap((r) => r.Ingredients).map((i) => i.Name)) ]
  let counter = 0
  const ingredientNameIdMap = allIngredients.reduce((acc, iName) => {
      acc[iName] = counter++
      return acc
  }, {})

  const newRecipes = oldRecipes.map((r) => {
    const { Name, Preparation, Garnish, Ingredients } = r 

    const convertedIngredients = Ingredients.map((i) => ({
      id: ingredientNameIdMap[i.Name],
      name: i.Name,
      dosage: i.Dosage,
      unit: i.Unit
    }))

    return {
      name: Name,
      preparation: Preparation,
      ...(Garnish.length !== 0 && { garnish: Garnish }),
      ingredients: convertedIngredients,
    }
  })
  writeFileSync('cocktails_3.json', JSON.stringify(newRecipes, null, 2))
}

main()
