import { MongoConnection } from '../src/db/mongo-connection.js'

function cleanup () {
  MongoConnection.getInstance().disconnect()
}

export const mochaHooks = {
  afterAll () {
    cleanup()
  }
}
