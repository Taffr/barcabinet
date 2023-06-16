import { IWorldOptions, World } from '@cucumber/cucumber'
import { Request, Response } from 'express'
import { executeCommand } from '../../src/rest/execute-command.js'
import { executeQuery } from '../../src/rest/execute-query.js'
import { Command } from '../../src/rest/command.js'
import { Query } from '../../src/rest/query.js'

class ResponseSpy {
  returnCode = 0
  result: unknown | null = null

  status (code: number) {
    this.returnCode = code
    return this
  }

  json (res: unknown) {
    this.result = res
    return this
  }
}

export class TestWorld extends World {
  responseSpy: ResponseSpy
  constructor (opts: IWorldOptions<unknown>) {
    super(opts)
    this.responseSpy = new ResponseSpy()
  }

  runCommand (command: Command<unknown, unknown>, data: unknown) {
    return executeCommand(command)(
      { body: data } as Request,
      this.responseSpy as unknown as Response
    )
  }

  runQuery (query: Query<unknown, unknown>, params: unknown) {
    return executeQuery(query)(
      { params } as Request,
      this.responseSpy as unknown as Response
    )
  }

  result () {
    return this.responseSpy.result
  }
}
