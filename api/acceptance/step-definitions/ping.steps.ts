import { DataTable, When, Then, World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { executeCommand } from '../../src/rest/execute-command.js'
import { CommandPing } from '../../src/commands/command-ping.js'
import { Request, Response } from 'express'
import { assert } from 'chai'

class ResponseSpy {
  returnCode = 0
  result: unknown | null = null
  conststructor () {
    this.returnCode = 0
    this.result = null
  }
  status (code: number) {
    this.returnCode = code;
    return this 
  }
  send (res: any) {
    this.result = res
    return this
  }
}

class TestWorld extends World {
  responseSpy: ResponseSpy
  constructor (opts: IWorldOptions<any>) {
    super(opts)
    this.responseSpy = new ResponseSpy()
  }
}
setWorldConstructor(TestWorld)

When('I ping the server with message {string}', function (this: TestWorld, msg: string) {
  const asRequest = {
    body: {
      ping: msg,
    },
  } as Request

  return executeCommand(CommandPing)(asRequest, this.responseSpy as unknown as Response)
})

Then('I receive the following response', function (this: TestWorld, table: DataTable) {
  const { code, message } = table.hashes()[0] as Record<string, string>

  const result = this.responseSpy.result
  const statusCode = this.responseSpy.returnCode

  assert.equal(Number(code), statusCode)
  assert.deepEqual(result, message) 
});
