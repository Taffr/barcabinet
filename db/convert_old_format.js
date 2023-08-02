import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid';

function main() {
  const oldRecipes = JSON.parse(readFileSync('./cocktails_2.0.json', 'utf-8'))

  const allIngredients = [ ... new Set(oldRecipes.flatMap((r) => r.Ingredients).map((i) => i.Name)) ]
  const ingredientFrequency = {}
  
  // oldRecipes
  //   .flatMap((r) => r.Ingredients)
  //   .forEach((i) => {
  //     const curr = ingredientFrequency[i.Name]
  //     ingredientFrequency[i.Name] = curr ? curr + 1 : 1
  //   })

  // const lowFrequency = Object.entries(ingredientFrequency).filter(([ key, value ]) => value < 3)
  // console.dir(lowFrequency, { depth: null })
  
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
      ...(i.Dosage && { dosage: i.Dosage }),
      ...(i.Unit && { unit: i.Unit }),
    }))

    return {
      id: uuidv4(),
      name: Name,
      ...(Preparation.length !== 0 && { preparation: Preparation }),
      ...(Garnish.length !== 0 && { garnish: Garnish }),
      ingredients: convertedIngredients,
    }
  })
  writeFileSync('cocktails_3.json', JSON.stringify(newRecipes, null, 2))
}

main()
