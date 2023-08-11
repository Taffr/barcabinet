import { Maybe } from 'src/util/Maybe';

export interface ICabinetStore {
  getCabinetForUser(ownerId: string): Promise<Maybe<number[]>>;
  addToUserCabinet(
    ownerId: string,
    ingredientId: number,
  ): Promise<Maybe<number[]>>;
  removeFromUserCabinet(
    ownerId: string,
    ingredientId: number,
  ): Promise<Maybe<number[]>>;
}
