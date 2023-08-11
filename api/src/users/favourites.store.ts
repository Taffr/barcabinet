import { Injectable, Inject } from '@nestjs/common';
import {
  CollectionReference,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import { prop, reject, equals, uniq } from 'ramda';
import { IFavouritesStore } from './interfaces/favourites.store.interface';
import { User } from './documents/user.document';
import { getSafeFirst } from '../util/funcs';
import { Maybe } from '../util/Maybe';

@Injectable()
export class FavouritesStore implements IFavouritesStore {
  constructor(
    @Inject(User.collectionName)
    readonly userCollection: CollectionReference<User>,
  ) {}

  private async getUserSnapshot(
    ownerId: string,
  ): Promise<Maybe<QueryDocumentSnapshot>> {
    const queryMatch = await this.userCollection
      .where('id', '==', ownerId)
      .get();
    return getSafeFirst(queryMatch.docs);
  }

  async getFavouritesForUser(ownerId: string): Promise<Maybe<string[]>> {
    const maybeUserRef = await this.getUserSnapshot(ownerId);
    return maybeUserRef.map((ss) => ss.data()).map(prop('favourites'));
  }

  async addToUserFavourites(ownerId: string, recipeId: string) {
    const maybeUserRef = await this.getUserSnapshot(ownerId);
    return maybeUserRef
      .mapAsync(async (ss) => {
        const currentCabinet = prop('favourites', ss.data());
        const withAdded = uniq([...currentCabinet, recipeId]);
        await ss.ref.update({ favourites: withAdded });
      })
      .then(() => this.getFavouritesForUser(ownerId));
  }

  async removeFromUserFavourites(ownerId: string, recipeId: string) {
    const maybeUserRef = await this.getUserSnapshot(ownerId);
    return maybeUserRef
      .mapAsync((ss) =>
        ss.ref.update({
          favourites: reject(equals(recipeId), prop('favourites', ss.data())),
        }),
      )
      .then(() => this.getFavouritesForUser(ownerId));
  }
}
