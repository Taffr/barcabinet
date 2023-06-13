import { Command } from '../rest/command.js'
import { Request } from 'express'

export const commandPing: Command<string, string> = {
  method: 'post',
  route: '/ping',
  statusCode: 200,
  processInput: (req: Request) => {
    const { body } = req
    return body.ping
  },
  runCommand: (processed: string) => 'PONG: You sent ' + processed
}
