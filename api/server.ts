import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { registerCommand } from './src/rest/register-command.js'
import { CommandPing } from './src/commands/command-ping.js'

const app: Express = express()
const port = process.env.port || 3000

app.use(bodyParser.json())

const registered = registerCommand(app, CommandPing)

registered.listen(port, () => {
  console.log('Started Server...')
  console.log(`Running server on ${port}`)
})

export { app }
