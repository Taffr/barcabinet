import { registerCommand } from './register-command.js'
import type { Express } from 'express'
import { compose, map, reduce, replace } from 'ramda'
import bluebird from 'bluebird'
import { glob } from 'glob'

const formatToRelativeJsImport =
  compose(replace('.ts', '.js'), replace('src/', '../'))

const commandFiles = await glob('./src/**/command-*.ts')
const formatted = map(formatToRelativeJsImport, commandFiles)
const allQueries = await bluebird.map(formatted, async (path) => {
  return (await import(path)).default
})

export const registerAllCommands = (app: Express) => reduce(registerCommand, app, allQueries) 

