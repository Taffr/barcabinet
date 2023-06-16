import type { Express } from 'express'
import { Query } from './query.js'
import { executeQuery } from './execute-query.js'

const registerQuery = (app: Express, query: Query<unknown, unknown>) => {
  const { route } = query
  app.get(route, executeQuery(query))
  return app
}

export { registerQuery }
