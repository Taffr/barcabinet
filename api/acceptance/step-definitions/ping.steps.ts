import { DataTable, When, Then, World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { commandPing } from '../../src/commands/command-ping.js'
import { TestWorld } from '../support/test-world.js'
import { assert } from 'chai'

setWorldConstructor(TestWorld)

When('I ping the server with message {string}', function (this: TestWorld, msg: string) {
  return this.runCommand(commandPing, { ping: msg })
})

Then('I receive the following response', function (this: TestWorld, table: DataTable) {
  const { code, message } = table.hashes()[0] as Record<string, string>

  const result = this.responseSpy.result
  const statusCode = this.responseSpy.returnCode

  assert.equal(Number(code), statusCode)
  assert.deepEqual(result, message) 
});
