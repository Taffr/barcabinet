import { MongoConnection } from './mongo-connection.js'
import { map } from 'ramda'
import { Collection } from 'mongodb'

export function createCollection<CollectionType>(collectionName: string, methods: Record<string, (p: Promise<Collection<any>>) => (args: any) => any>) {
  const connection = MongoConnection.getInstance()
  const collectionPromise = connection.getCollection(collectionName)
  return map((m) => m(collectionPromise), methods) as CollectionType
}
