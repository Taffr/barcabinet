import { Injectable, Inject } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { compose, head } from 'ramda';
import { Maybe } from '../util/Maybe';
import { User } from './documents/user.document';

@Injectable()
export class UserStore {
  constructor(
    @Inject(User.collectionName)
    private userCollection: CollectionReference<User>,
  ) {}

  async addUser(u: User): Promise<string> {
    const addedUserRef = await this.userCollection.add(u);
    const data = (await addedUserRef.get()).data();
    return data.id;
  }

  async findByName(nameToFind: string): Promise<Maybe<User>> {
    const getSafeFirstUser = compose(Maybe.of, head);
    const usersWithName = await this.userCollection
      .where('name', '==', nameToFind)
      .get();

    return getSafeFirstUser(await usersWithName.docs.map((doc) => doc.data()));
  }
}
