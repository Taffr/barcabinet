import { registerCommand } from './register-command.js'
import type { Express } from 'express'
import { compose, map, reduce, replace } from 'ramda'
import bluebird from 'bluebird'

const allFilePaths = [
  '../commands/command-ping.js',
] as const

const formatToRelativeJsImport =
  compose(replace('.ts', '.js'), replace('src/', '../'))

const formatted = map(formatToRelativeJsImport, allFilePaths)
const allQueries = await bluebird.map(formatted, async (path) => {
  return (await import(path)).default
})

export const registerAllCommands =
  (app: Express) => reduce(registerCommand, app, allQueries)

