export class User {
  static collectionName = 'users';

  id: string;
  name: string;
  hash: string;
  favourites: string[];
  cabinet: number[];
}
