import { Maybe } from '../../util/Maybe';

export interface IFavouritesStore {
  getFavouritesForUser(ownerId: string): Promise<Maybe<string[]>>;
  addToUserFavourites(
    ownerId: string,
    recipeId: string,
  ): Promise<Maybe<string[]>>;
  removeFromUserFavourites(
    ownerId: string,
    recipeId: string,
  ): Promise<Maybe<string[]>>;
}
