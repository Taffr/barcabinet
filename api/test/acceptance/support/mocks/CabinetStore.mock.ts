import { CabinetStore } from '../../../../src/cabinet/cabinet.store';
import { Cabinet } from '../../../../src/cabinet/documents/cabinet.document';
import { UpdateCabinetDTO } from '../../../../src/cabinet/dtos/update-cabinet.dto';
import { Maybe } from '../../../../src/util/Maybe';
import { find, findIndex, propEq, update } from 'ramda';

class MockCabinetStore {
  private cabinetCollection: Cabinet[] = [];

  async addForUser(id: string) {
    const newCabinet = { ownerId: id, favourites: [], ingredients: [] };
    return this.cabinetCollection.push(newCabinet);
  }

  async updateForOwner(ownerId: string, updateCabinetDTO: UpdateCabinetDTO) {
    return Maybe.of(
      findIndex(propEq(ownerId, 'ownerId'), this.cabinetCollection),
    )
      .map((index) =>
        update(index, { ownerId, ...updateCabinetDTO }, this.cabinetCollection),
      )
      .map((newArray) => {
        this.cabinetCollection = newArray;
        return this.cabinetCollection;
      });
  }

  async getForOwner(ownerId: string): Promise<Maybe<Cabinet>> {
    return Promise.resolve(
      Maybe.of(find(propEq(ownerId, 'ownerId'), this.cabinetCollection)),
    );
  }
}

export default {
  classToMock: CabinetStore,
  mock: MockCabinetStore,
};
