import { ICabinetStore } from '../../../../src/cabinet/interfaces/cabinet.store.interface';
import { CabinetStore } from '../../../../src/cabinet/cabinet.store';
import { Cabinet } from '../../../../src/cabinet/documents/cabinet.document';
import { UpdateCabinetDTO } from '../../../../src/cabinet/dtos/update-cabinet.dto';
import { Maybe } from '../../../../src/util/Maybe';
import {
  append,
  equals,
  find,
  findIndex,
  includes,
  propEq,
  reject,
  update,
} from 'ramda';

class MockCabinetStore implements ICabinetStore {
  private cabinetCollection: Cabinet[] = [];

  addForUser(id: string) {
    const newCabinet = { ownerId: id, favourites: [], ingredients: [] };
    this.cabinetCollection.push(newCabinet);
    return Promise.resolve(id);
  }

  updateForOwner(ownerId: string, updateCabinetDTO: UpdateCabinetDTO) {
    return Promise.resolve(
      Maybe.of(findIndex(propEq(ownerId, 'ownerId'), this.cabinetCollection))
        .map((index) => [
          update(
            index,
            { ownerId, ...updateCabinetDTO },
            this.cabinetCollection,
          ),
          index,
        ])
        .map(([newArray, index]) => {
          this.cabinetCollection = newArray;
          this.cabinetCollection;
          return this.cabinetCollection[index];
        }),
    );
  }

  getForOwner(ownerId: string): Promise<Maybe<Cabinet>> {
    return Promise.resolve(
      Maybe.of(find(propEq(ownerId, 'ownerId'), this.cabinetCollection)),
    );
  }

  addToFavourites(ownerId: string, recipeId: string) {
    return Promise.resolve(
      Maybe.of(
        findIndex(propEq(ownerId, 'ownerId'), this.cabinetCollection),
      ).map((index) => {
        const current = this.cabinetCollection[index];
        const currentFavourites = current.favourites;
        const newFavourites = includes(recipeId, currentFavourites)
          ? currentFavourites
          : append(recipeId, currentFavourites);
        this.cabinetCollection = update(
          index,
          { ...current, favourites: newFavourites },
          this.cabinetCollection,
        );
        return this.cabinetCollection[index];
      }),
    );
  }
  removeFromFavourites(ownerId: string, recipeId: string) {
    return Promise.resolve(
      Maybe.of(
        findIndex(propEq(ownerId, 'ownerId'), this.cabinetCollection),
      ).map((index) => {
        const current = this.cabinetCollection[index];
        const currentFavourites = current.favourites;
        const withRemoved = reject(equals(recipeId), currentFavourites);
        this.cabinetCollection = update(
          index,
          { ...current, favourites: withRemoved },
          this.cabinetCollection,
        );
        return this.cabinetCollection[index];
      }),
    );
  }
}

export default {
  classToMock: CabinetStore,
  mock: MockCabinetStore,
};
