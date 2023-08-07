import { Injectable, Inject } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { compose, head } from 'ramda';
import { Cabinet } from './documents/cabinet.document';
import { UpdateCabinetDTO } from './dtos/update-cabinet.dto';
import { Maybe } from '../util/Maybe';

const getSafeFirst = compose(Maybe.of, head);

@Injectable()
export class CabinetStore {
  constructor(
    @Inject(Cabinet.collectionName)
    private cabinetCollection: CollectionReference<Cabinet>,
  ) {}

  async addForUser(id: string) {
    const newCabinet = { ownerId: id, favourites: [], ingredients: [] };
    return this.cabinetCollection.add(newCabinet);
  }

  async updateForOwner(ownerId: string, data: UpdateCabinetDTO) {
    const matchingCabinets = await this.cabinetCollection
      .where('ownerId', '==', ownerId)
      .get();
    return getSafeFirst(matchingCabinets.docs).mapAsync((ref) =>
      ref.update(data),
    );
  }

  async getForOwner(ownerId: string): Promise<Maybe<Cabinet>> {
    const matchingCabinets = await this.cabinetCollection
      .where('ownerId', '==', ownerId)
      .get();
    return getSafeFirst(await matchingCabinets.docs.map((doc) => doc.data()));
  }
}
