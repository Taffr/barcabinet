import type { Express, Request, Response } from 'express'
import type { Command } from './command.js'

const registerCommand = (app: Express, command: Command<any>) => {
  const {
    method,
    route,
    processInput,
    runCommand,
  } = command

  app[method](route, (req: Request, res: Response) => {
    const processed = processInput(req)
    return runCommand(res, processed)
  })
  return app
}

export { registerCommand }
