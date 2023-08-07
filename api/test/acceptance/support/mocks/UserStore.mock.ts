import { IUserStore } from '../../../../src/users/interfaces/user.store.interface';
import { UserStore } from '../../../../src/users/user.store';
import { User } from '../../../../src/users/documents/user.document';
import { Maybe } from '../../../../src/util/Maybe';
import { find } from 'ramda';

class MockUserStore implements IUserStore {
  private userCollection: User[] = [];
  add(u) {
    this.userCollection.push(u);
    return Promise.resolve(u.id);
  }

  findByName(nameToFind) {
    return Promise.resolve(
      Maybe.of(find((u) => u.name === nameToFind, this.userCollection)),
    );
  }
}

export default {
  classToMock: UserStore,
  mock: MockUserStore,
};
