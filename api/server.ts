import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { registerQuery } from './src/rest/register-query.js'
import { queryGetAllIngredients } from './src/queries/ingredients/query-get-all-ingredients.js'


const app: Express = express()
const port = process.env.port || 3000

app.use(bodyParser.json())

const withQuery = registerQuery(app, queryGetAllIngredients)

withQuery.listen(port, () => {
  console.log('Started Server...')
  console.log(`Running server on ${port}`)
})

export { app }
