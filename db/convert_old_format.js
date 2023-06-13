import { readFileSync, writeFileSync } from 'fs'

function main() {
  const oldRecipes = JSON.parse(readFileSync('./cocktails_2.0.json', 'utf-8'))
  const newRecipes = oldRecipes.map((r) => {
    const { Name, Preparation, Garnish, Ingredients } = r 

    const convertedIngredients = Ingredients.map((i) => ({
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
