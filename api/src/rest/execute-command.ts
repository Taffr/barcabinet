import { Command } from './command.js'
import { Request, Response } from 'express'

export function executeCommand<A, B>(command: Command<A, B>) {
  const {
    statusCode,
    processInput,
    runCommand,
  } = command

  return (req: Request, res: Response) => {
    const processed = processInput(req)
    const result = runCommand(processed)
    return res.status(statusCode).send(result)
  }
}
