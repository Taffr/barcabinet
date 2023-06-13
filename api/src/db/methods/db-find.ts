import type { Collection } from 'mongodb'
import { curryN } from 'ramda'

const dbFind = curryN(1, async (collectionPromise: Promise<Collection>, query: Record<any, any> = {}, projection: Record<any, any> = {}) => {
  const coll = await collectionPromise
  const cursor = await coll.find(query, projection)
  return cursor.toArray()
})



export { dbFind }
