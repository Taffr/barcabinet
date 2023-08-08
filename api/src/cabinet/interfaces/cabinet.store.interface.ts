import { Cabinet } from '../documents/cabinet.document';
import { UpdateCabinetDTO } from '../dtos/update-cabinet.dto';
import { Maybe } from '../../util/Maybe';

export interface ICabinetStore {
  addForUser(id: string): Promise<string>;
  updateForOwner(id: string, dto: UpdateCabinetDTO): Promise<Maybe<Cabinet>>;
  getForOwner(ownerId: string): Promise<Maybe<Cabinet>>;
  addToFavourites(ownerId: string, recipeId: string): Promise<Maybe<Cabinet>>;
  removeFromFavourites(
    ownerId: string,
    recipeId: string,
  ): Promise<Maybe<Cabinet>>;
  addToIngredients(
    ownerId: string,
    ingredientId: number,
  ): Promise<Maybe<Cabinet>>;
  removeFromIngredients(
    ownerId: string,
    ingredientId: number,
  ): Promise<Maybe<Cabinet>>;
}
