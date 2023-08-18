import { readFileSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid';


const toTitleCase = (s) => s.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

function main() {
  const oldRecipes = JSON.parse(readFileSync('./cocktails_2.0.json', 'utf-8'))
    
  const nonUniqueIngredients = oldRecipes.flatMap((r) => r.Ingredients).map((i) => toTitleCase(i.Name))
  const allIngredients = [ ... new Set(nonUniqueIngredients) ]
  
  let counter = 0
  const ingredientNameIdMap = allIngredients.reduce((acc, iName) => {
    acc[iName] = counter++
    return acc
  }, {})

  const newRecipes = oldRecipes.map((r) => {
    const { Name, Preparation, Garnish, Ingredients } = r 

    const convertedIngredients = Ingredients.map((i) => ({
      id: ingredientNameIdMap[toTitleCase(i.Name)],
      name: toTitleCase(i.Name),
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
