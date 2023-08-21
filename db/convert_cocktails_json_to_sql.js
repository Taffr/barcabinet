import { appendFileSync, readFileSync } from 'node:fs';
import { map, compose, uniq, prop, chain, forEach } from 'ramda';
const INPUT_FILE = './cocktails_3.json';
const OUTPUT_FILE = './new_data.sql';

const insertIngredientIntoTableString =
    ({ id, name }) => `INSERT INTO Ingredient (id, name) VALUES (${id}, "${name}");\n`

const insertRecipeIntoTableString = (recipe) => {
    const { id, name, garnish, preparation } = recipe;
    const preparationString = preparation ? `"${preparation.replace(/"/g, "'")}"`: 'NULL';
    const garnishString = garnish ? `"${preparation.replace(/"/g, "'")}"`: 'NULL';
    return `INSERT INTO Recipe (id, name, garnish, preparation) VALUES (${id}, "${name}", ${garnishString}, ${preparationString});\n`;
};

const insertDosagesIntoTableStrings = (recipe) => {
    const { ingredients, id: recipeId } = recipe;
    return map(({ id: ingredientId, unit, dosage }) => {
        const amountString = dosage ? dosage: 0;
        const unitString = unit ? `"${unit}"`: 'NULL';
        return `INSERT INTO Dosage (recipeId, ingredientId, amount, unit) VALUES (${recipeId}, ${ingredientId}, ${amountString}, ${unitString});\n`;
    }, ingredients)
}

const getAllUniqueIngredients = compose(
    uniq,
    map(({ id, name }) => ({id, name })),
    chain(prop('ingredients'))
);

async function main() {
    let counter = 0;
    const recipes = map((r) => ({...r, id: counter++ }), JSON.parse(readFileSync(INPUT_FILE)));
    const uniqIngredients = getAllUniqueIngredients(recipes);
    appendFileSync(OUTPUT_FILE, 'USE cocktails;\n');
    forEach((s) => appendFileSync(OUTPUT_FILE, insertIngredientIntoTableString(s)), uniqIngredients);
    forEach((r) => appendFileSync(OUTPUT_FILE, insertRecipeIntoTableString(r)), recipes);
    forEach((s) => appendFileSync(OUTPUT_FILE, s), chain(insertDosagesIntoTableStrings, recipes));
}

main();
