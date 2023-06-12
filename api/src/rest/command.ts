import type { Request } from 'express'

export interface Command<ProcessedRequestData, CommandData>{
  method: 'post' | 'put'
  route: string
  statusCode: number
  processInput: (req: Request) => ProcessedRequestData
  runCommand: (processedData: ProcessedRequestData) => CommandData
}

