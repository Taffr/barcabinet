import { Recipe } from '../recipes/documents/recipe.document';
import { User } from '../users/documents/user.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  Recipe.collectionName,
  User.collectionName,
];
