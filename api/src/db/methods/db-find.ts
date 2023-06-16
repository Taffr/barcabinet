import type { Collection, Document, Filter, FindOptions } from 'mongodb'

export function dbFind (collectionPromise: Promise<Collection<Document>>) {
  return async (q: Filter<Document> = {}, opts: FindOptions<Document> = {}) => {
    const coll = await collectionPromise
    const cursor = await coll.find(q, opts)
    return cursor.toArray()
  }
}



