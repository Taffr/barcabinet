import { Injectable } from '@nestjs/common';

export interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  description: string;
  garnish?: string;
}

const ALL_RECIPES: Recipe[] = [
  {
    id: 0,
    name: 'Cuba Libre',
    ingredients: [
      {
        id: 0,
        name: 'Dark Rum',
      },
      {
        id: 1,
        name: 'Lime Juice',
      },
      {
        id: 2,
        name: 'Coca-Cola',
      },
    ],
    garnish: 'Slice of Lime',
    description:
      'Add lime juice, ice, and dark rum in sufficient quanitity, top of with the cola.',
  },
  {
    id: 1,
    name: 'Gin & Tonic',
    ingredients: [
      {
        id: 3,
        name: 'Gin',
      },
      {
        id: 4,
        name: 'Tonic',
      },
    ],
    garnish: 'Cucumber Slices and whole black pepper corns',
    description:
      'Stir tonic, gin, and ice, serve with slices of cucumber and whole pepper corns',
  },
];

@Injectable()
export class RecipeStore {
  getAll(): Recipe[] {
    return ALL_RECIPES;
  }
  containingIngredient(ingredientId: number) {
    return ALL_RECIPES.filter(({ ingredients }) =>
      ingredients.some(({ id }) => id === ingredientId),
    );
  }
}
