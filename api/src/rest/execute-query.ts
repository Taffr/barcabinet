import { Query } from './query.js'
import { Request, Response } from 'express'
import { isNil } from 'ramda'

export function executeQuery<A,B>(query: Query<A,B>) {
  const {
    statusCode,
    processParams,
    runQuery,
  } = query

  return async (req: Request, res: Response) => {
    if (!isNil(processParams)) {
      const params = await processParams(req)
      const result = await runQuery(params)
      return res.status(statusCode).json(result)
    } else {
      return res.status(statusCode).json(await runQuery())
    }
  }
}
