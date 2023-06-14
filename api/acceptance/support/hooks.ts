import { BeforeAll, AfterAll, setWorldConstructor } from '@cucumber/cucumber'
import { TestWorld } from './test-world.js'
import { MongoConnection } from '../../src/db/mongo-connection.js'

BeforeAll(() => setWorldConstructor(TestWorld))
AfterAll(async () => await MongoConnection.getInstance().disconnect())
