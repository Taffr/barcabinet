import { MongoConnection } from '../src/db/mongo-connection.js'

async function cleanup () {
  await MongoConnection.getInstance().disconnect()
}

export const mochaHooks = {
  async afterAll () {
    await cleanup()
  }
}
