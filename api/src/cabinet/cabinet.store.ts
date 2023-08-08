import { Injectable, Inject } from '@nestjs/common';
import {
  CollectionReference,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import { append, always, equals, includes, reject } from 'ramda';
import { Cabinet } from './documents/cabinet.document';
import { UpdateCabinetDTO } from './dtos/update-cabinet.dto';
import { ICabinetStore } from './interfaces/cabinet.store.interface';
import { getSafeFirst } from '../util/funcs';

@Injectable()
export class CabinetStore implements ICabinetStore {
  constructor(
    @Inject(Cabinet.collectionName)
    private cabinetCollection: CollectionReference<Cabinet>,
  ) {}

  addForUser(id: string) {
    return this.cabinetCollection
      .add({ ownerId: id, favourites: [], ingredients: [] })
      .then(always(id));
  }

  updateForOwner(ownerId: string, data: UpdateCabinetDTO) {
    return this.cabinetCollection
      .where('ownerId', '==', ownerId)
      .get()
      .then((match) =>
        getSafeFirst(match.docs).mapAsync(
          async ({ ref }: QueryDocumentSnapshot) => {
            await ref.update({ ...data });
          },
        ),
      )
      .then(() => this.getForOwner(ownerId));
  }

  getForOwner(ownerId: string) {
    return this.cabinetCollection
      .where('ownerId', '==', ownerId)
      .get()
      .then((match) => getSafeFirst(match.docs.map((doc) => doc.data())));
  }

  async addToFavourites(ownerId: string, recipeId: string) {
    const maybeCurrentCabinet = await this.getForOwner(ownerId);
    return maybeCurrentCabinet.chainAsync((cabinet) => {
      const currentFavourites = cabinet.favourites;
      const withAdded = includes(recipeId, currentFavourites)
        ? currentFavourites
        : append(recipeId, currentFavourites);
      const newCabinet = { ...cabinet, favourites: withAdded };
      return this.updateForOwner(ownerId, newCabinet);
    });
  }

  async removeFromFavourites(ownerId: string, recipeId: string) {
    const maybeCurrentCabinet = await this.getForOwner(ownerId);
    return maybeCurrentCabinet.chainAsync((cabinet) => {
      const currentFavourites = cabinet.favourites;
      const withRemoved = reject(equals(recipeId), currentFavourites);
      const newCabinet = { ...cabinet, favourites: withRemoved };
      return this.updateForOwner(ownerId, newCabinet);
    });
  }
}
