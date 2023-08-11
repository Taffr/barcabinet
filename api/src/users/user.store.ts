import { Injectable, Inject } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { getSafeFirst } from '../util/funcs';
import { IUserStore } from './interfaces/user.store.interface';
import { User } from './documents/user.document';

@Injectable()
export class UserStore implements IUserStore {
  constructor(
    @Inject(User.collectionName)
    private userCollection: CollectionReference<User>,
  ) {}

  async add(u: User) {
    return this.userCollection
      .add(u)
      .then((ref) => ref.get())
      .then((ss) => ss.data().id);
  }

  async findByName(nameToFind: string) {
    const usersWithName = await this.userCollection
      .where('name', '==', nameToFind)
      .get();
    return getSafeFirst(usersWithName.docs.map((doc) => doc.data()));
  }
}
