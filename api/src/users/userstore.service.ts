import { Injectable, Inject } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { head } from 'ramda';
import { Maybe } from '../util/Maybe';
import { User } from './documents/user.document';

@Injectable()
export class UserStore {
  constructor(
    @Inject(User.collectionName)
    private userCollection: CollectionReference<User>,
  ) {}

  async addUser(u: User) {
    return this.userCollection.add(u);
  }

  async findByName(nameToFind: string): Promise<Maybe<User>> {
    const usersWithName = await this.userCollection
      .where('name', '==', nameToFind)
      .get();
    return Maybe.of(head(await usersWithName.docs.map((doc) => doc.data())));
  }
}
