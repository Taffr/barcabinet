import { MongoClient } from 'mongodb'

class ClientManager {
  private client: Promise<MongoClient>

  constructor (url: string) {
    this.client = MongoClient.connect(url)
  }

  async getCollection (collectionName: string) {
    return (await this.client).db('barcabinet').collection(collectionName)
  }

  async disconnect () {
    await (await this.client).close()
  }
}

export class MongoConnection {
  private static instance: MongoConnection
  private client: ClientManager
  private dbUrl = 'mongodb://localhost:27017' as const
  private constructor () {
    this.client = new ClientManager(this.dbUrl)
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new MongoConnection()
    }
    return this.instance
  }

  getCollection (collectionName: string) {
    return this.client.getCollection(collectionName)
  }


  async disconnect () {
    await this.client.disconnect()
  }
}
