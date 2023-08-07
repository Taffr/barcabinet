import { Recipe } from '../documents/recipe.document';
import { Addable, IdFindable, GetAllable } from '../../types/store/interfaces';

export interface IRecipeStore
  extends Addable<Recipe>,
    IdFindable<Recipe>,
    GetAllable<Recipe> {
  getContainingIngredientId(id: number): Promise<Recipe[]>;
  getContainingIngredientIds(ids: number[]): Promise<Recipe[]>;
}
