import { MongoConnection } from './mongo-connection.js'
import { map } from 'ramda'
import { Collection, Document, Filter, FindOptions } from 'mongodb'

type FindFunction
  = (q?: Filter<Document>, opts?: FindOptions<Document>) => Promise<Document[]>


type CollectionFunction = FindFunction
type CollectionMethod =
  (collectionPromise: Promise<Collection<Document>>)
    => CollectionFunction

type MethodName = string

export function createCollection<CollectionType> (
  collectionName: string,
  methods: Record<MethodName, CollectionMethod>
) {
  const connection = MongoConnection.getInstance()
  const collectionPromise = connection.getCollection(collectionName)
  return map((m) => m(collectionPromise), methods) as CollectionType
}
