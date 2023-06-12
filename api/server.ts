import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import type { Command } from './src/rest/command.js'
import { registerCommand } from './src/rest/register-command.js'

const testCommand: Command<string> = {
  method: 'post',
  route: '/ping',
  processInput: (req: Request) => {
    const { body } = req
    return 'PONG: You sent: ' + JSON.stringify(body)
  },
  runCommand: (res: Response, processed: string) => res.send(processed)
}


const app: Express = express()
const port = process.env.port || 3000

app.use(bodyParser.json())

const registered = registerCommand(app, testCommand)

registered.listen(port, () => {
  console.log('Started Server...')
  console.log(`Running server on ${port}`)
})

export { app }
