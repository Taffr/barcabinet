import type { Request, Response } from 'express'

export interface Command<ProcessedRequestData>{
  method: 'post' | 'put'
  route: string
  processInput: (req: Request) => ProcessedRequestData
  runCommand: (response: Response, processedData: ProcessedRequestData) => Response
}
