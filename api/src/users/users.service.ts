import { Injectable } from '@nestjs/common';
import { compose, find } from 'ramda';
import { Maybe } from '../util/Maybe';

export type User = {
  id: number;
  name: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly USERS: User[] = [
    {
      id: 0,
      name: 'Alice',
      password: 'somepassword',
    },
    {
      id: 1,
      name: 'Bob',
      password: 'secret123',
    },
  ];

  async findByName(nameToFind: string) {
    const findMaybe = compose(
      Maybe.of,
      find(({ name }) => name === nameToFind),
    );

    return findMaybe(this.USERS);
  }
}
