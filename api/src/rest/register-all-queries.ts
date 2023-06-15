import { registerQuery } from './register-query.js'
import type { Express } from 'express'
import { compose, map, reduce, replace } from 'ramda'
import bluebird from 'bluebird'

const allFilePaths = [
  '../queries/recipes/query-get-all-recipes.js',
  '../queries/ingredients/query-get-all-ingredients.js',
] as const

const formatToRelativeJsImport =
  compose(replace('.ts', '.js'), replace('src/', '../'))


const formatted = map(formatToRelativeJsImport, allFilePaths)
const allQueries = await bluebird.map(formatted, async (path) => {
  return (await import(path)).default
})

export const registerAllQueries = (app: Express) => reduce(registerQuery, app, allQueries) 

