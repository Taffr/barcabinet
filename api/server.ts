import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { registerAllQueries } from './src/rest/register-all-queries.js'
import { registerAllCommands } from './src/rest/register-all-commands.js'
import { compose } from 'ramda'

const app: Express = express()
const port = process.env.port || 3000

app.use(bodyParser.json())

const registeredApp = compose(registerAllQueries, registerAllCommands)(app)

registeredApp.listen(port, () => {
  console.log('Started Server...')
  console.log(`Running server on ${port}`)
})

export { app }
