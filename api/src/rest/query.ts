import { Request } from 'express'

export interface Query<ProcessedParams, QueryResult> {
  statusCode: number
  route: string
  processParams?: (req: Request) => ProcessedParams
  runQuery: (params?: ProcessedParams) => QueryResult
}
