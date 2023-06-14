import type { Collection } from 'mongodb'

export function dbFind (collectionPromise: Promise<Collection>) { 
  return async (query: Record<any, any> = {}, projection: Record<any, any> = {}) => {
    const coll = await collectionPromise
    const cursor = await coll.find(query, projection)
    return cursor.toArray()
  }
}



