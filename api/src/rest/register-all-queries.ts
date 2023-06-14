import { registerQuery } from './register-query.js'
import type { Express } from 'express'
import { compose, map, reduce, replace } from 'ramda'
import bluebird from 'bluebird'
import { glob } from 'glob'

const formatToRelativeJsImport =
  compose(replace('.ts', '.js'), replace('src/', '../'))

const queryFiles = await glob('./src/**/query-*.ts')
const formatted = map(formatToRelativeJsImport, queryFiles)
const allQueries = await bluebird.map(formatted, async (path) => {
  return (await import(path)).default
})

export const registerAllQueries = (app: Express) => reduce(registerQuery, app, allQueries) 

