import { User } from '../documents/user.document';
import { Addable, NameFindable } from '../../types/store/interfaces';

export interface IUserStore extends Addable<User>, NameFindable<User> {}
