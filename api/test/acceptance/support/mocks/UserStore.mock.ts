import { UserStore } from '../../../../src/users/userstore.service';
import { User } from '../../../../src/users/documents/user.document';
import { Maybe } from '../../../../src/util/Maybe';
import { find } from 'ramda';

class MockUserStore {
  private userCollection: User[] = [];
  async addUser(u: User): Promise<User> {
    this.userCollection.push(u);
    return Promise.resolve(u);
  }

  async findByName(nameToFind: string): Promise<Maybe<User>> {
    return Promise.resolve(
      Maybe.of(find((u) => u.name === nameToFind, this.userCollection)),
    );
  }
}

export default {
  classToMock: UserStore,
  mock: MockUserStore,
};
