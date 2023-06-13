import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { registerCommand } from './src/rest/register-command.js'
import { registerQuery } from './src/rest/register-query.js'
import { commandPing } from './src/commands/command-ping.js'
import { queryIngredients } from './src/queries/query-ingredients.js'

const app: Express = express()
const port = process.env.port || 3000

app.use(bodyParser.json())

const withCommand  = registerCommand(app, commandPing)
const withQuery = registerQuery(withCommand, queryIngredients)

withQuery.listen(port, () => {
  console.log('Started Server...')
  console.log(`Running server on ${port}`)
})

export { app }
