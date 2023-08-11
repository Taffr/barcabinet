import { Injectable, Inject } from '@nestjs/common';
import {
  CollectionReference,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import { prop, reject, equals, uniq } from 'ramda';
import { ICabinetStore } from './interfaces/cabinet.store.interface';
import { getSafeFirst } from '../util/funcs';
import { User } from './documents/user.document';
import { Maybe } from '../util/Maybe';

@Injectable()
export class CabinetStore implements ICabinetStore {
  constructor(
    @Inject(User.collectionName)
    private userCollection: CollectionReference<User>,
  ) {}

  private async getUserSnapshot(
    ownerId: string,
  ): Promise<Maybe<QueryDocumentSnapshot>> {
    const queryMatch = await this.userCollection
      .where('id', '==', ownerId)
      .get();
    return getSafeFirst(queryMatch.docs);
  }

  async getCabinetForUser(ownerId: string): Promise<Maybe<number[]>> {
    const maybeUserRef = await this.getUserSnapshot(ownerId);
    return maybeUserRef.map((ss) => ss.data()).map(prop('cabinet'));
  }

  async addToUserCabinet(ownerId: string, ingredientId: number) {
    const maybeUserRef = await this.getUserSnapshot(ownerId);
    return maybeUserRef
      .mapAsync(async (ss) => {
        const currentCabinet = prop('cabinet', ss.data());
        const withAdded = uniq([...currentCabinet, ingredientId]);
        await ss.ref.update({ cabinet: withAdded });
      })
      .then(() => this.getCabinetForUser(ownerId));
  }

  async removeFromUserCabinet(ownerId: string, ingredientId: number) {
    const maybeUserRef = await this.getUserSnapshot(ownerId);
    return maybeUserRef
      .mapAsync((ss) =>
        ss.ref.update({
          cabinet: reject(equals(ingredientId), prop('cabinet', ss.data())),
        }),
      )
      .then(() => this.getCabinetForUser(ownerId));
  }
}
