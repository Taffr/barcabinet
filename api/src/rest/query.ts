import { Request } from 'express'

export interface Query<ProcessedParams, QueryResult> {
  statusCode: number
  route: string
  processParams?: (req: Request) => Promise<ProcessedParams>
  runQuery: (params?: ProcessedParams) => Promise<QueryResult>
}