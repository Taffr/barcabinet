import { Injectable, Inject } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { always } from 'ramda';
import { Cabinet } from './documents/cabinet.document';
import { ICabinetStore } from './interfaces/cabinet.store.interface';
import { getSafeFirst } from '../util/funcs';

@Injectable()
export class CabinetStore implements ICabinetStore {
  constructor(
    @Inject(Cabinet.collectionName)
    private cabinetCollection: CollectionReference<Cabinet>,
  ) {}

  addForUser(id) {
    return this.cabinetCollection
      .add({ ownerId: id, favourites: [], ingredients: [] })
      .then(always(id));
  }

  updateForOwner(ownerId, data) {
    return this.cabinetCollection
      .where('ownerId', '==', ownerId)
      .get()
      .then((match) =>
        getSafeFirst(match.docs).map((ref) => ref.update({ ownerId, ...data })),
      );
  }

  getForOwner(ownerId) {
    return this.cabinetCollection
      .where('ownerId', '==', ownerId)
      .get()
      .then((match) => getSafeFirst(match.docs.map((doc) => doc.data())));
  }
}
