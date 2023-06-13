import { MongoConnection } from './mongo-connection.js'
import { map } from 'ramda'

export function createCollection (collectionName: string, methods: Record<string, (p: any) => any>) {
  const connection = MongoConnection.getInstance()
  const collectionPromise = connection.getCollection(collectionName)
  return map((m) => m(collectionPromise), methods)
}
