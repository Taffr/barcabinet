import type { Express } from 'express'
import { Command } from './command.js'
import { executeCommand } from './execute-command.js'

const registerCommand = (app: Express, command: Command<any, any>) => {
  const { method, route } = command
  app[method](route, executeCommand(command))
  return app
}

export { registerCommand }
