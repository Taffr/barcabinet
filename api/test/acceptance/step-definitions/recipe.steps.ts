import { DataTable, Given, Then } from '@cucumber/cucumber';
import { pluck, prop, map, forEach } from 'ramda';
import { AcceptanceWorld } from '../support/world';
import { assert } from 'chai';
import { Ingredient, Prisma } from '@prisma/client';
import { ResolvedRecipe } from '../../../src/recipes/interfaces/resolved-recipe.interface';
import { PrismaService } from '../../../src/prisma/prisma.service';

Given(
  'the following ingredients exist',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const input = dataTable.hashes() as { name: string }[];

    const prisma: PrismaService = this.app.get(PrismaService);
    await prisma.ingredient.createMany({
      data: input,
    });

    const ingredients = await prisma.ingredient.findMany({
      where: { name: { in: pluck('name', input) } },
    });

    forEach((i: Ingredient) => {
      this.ingredientNameIdMap.set(i.name, i.id);
    }, ingredients);
  },
);

type RecipeHash = {
  name: string;
  garnish?: string;
  preparation: string;
  dosages: string;
};

Given(
  'the following recipes exist',
  async function (this: AcceptanceWorld, dataTable: DataTable) {
    const recipeInsertData = map((rawRecipe: RecipeHash) => {
      const { name, garnish, preparation, dosages } = rawRecipe;
      const parsedDosages = map((rawIngredient) => {
        const removeParams = rawIngredient.replace(/[\(\)]/, '');
        const [name, amountUnit] = removeParams.split(':');
        const [amount, unit] = amountUnit.replace(/\)/, '').split(' ');

        return {
          amount: Number(amount),
          unit,
          ingredientId: this.ingredientNameIdMap.get(name),
        };
      }, dosages.split(', '));

      const input: Prisma.RecipeCreateInput = {
        name,
        ...(garnish && { garnish }),
        preparation,
        dosages: {
          createMany: {
            data: parsedDosages,
          },
        },
      };
      return input;
    }, dataTable.hashes());

    const prisma: PrismaService = this.app.get(PrismaService);
    const inserted = await Promise.all(
      map(
        (data: Prisma.RecipeCreateInput) =>
          prisma.recipe.create({ data, select: { id: true, name: true } }),
        recipeInsertData,
      ),
    );
    forEach(
      (i: { id: number; name: string }) =>
        this.recipeNameIdMap.set(i.name, i.id),
      inserted,
    );
  },
);
Then(
  'I get recipes including the following',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedNames = dataTable.hashes().map((h) => h.name);
    const recipes: ResolvedRecipe[] = this.response.body;

    recipes.forEach((r) => {
      assert.hasAllKeys(r, [
        'name',
        'ingredients',
        'id',
        'garnish',
        'preparation',
      ]);
    });

    const resultNames = recipes.map(prop('name'));
    assert.includeDeepMembers(resultNames, expectedNames);
  },
);

Then(
  'I get ingredients including the following',
  function (this: AcceptanceWorld, dataTable: DataTable) {
    const expectedIngredients: string[] = dataTable.hashes().map(prop('name'));
    const resultIngredients: Ingredient[] = this.response.body;
    assert.includeDeepMembers(
      pluck('name', resultIngredients),
      expectedIngredients,
    );
  },
);
