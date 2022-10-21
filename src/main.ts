import path from 'path'

import * as core from '@actions/core'
import {parse} from 'dotenv'
import {loadEnvConfig} from '@next/env'

import {Environment, InputValues} from './types'

const getInput = (): InputValues => {
  const environment = core.getInput('environment') as Environment
  const pathToEnv = core.getInput('path') || '.'
  const workingDirectory = core.getInput('working-directory') || process.cwd()

  return {
    environment,
    pathToEnv,
    workingDirectory
  }
}

const loadEnvVariables = (
  environment: Environment,
  workingDirectory: string,
  pathToEnv: string
): Record<string, string | undefined> => {
  const isDevelopment = environment !== 'production'
  const envPath = path.join(workingDirectory, pathToEnv)

  const nextEnvResult = loadEnvConfig(envPath, isDevelopment, {
    info: core.info,
    error: core.error
  })
  const parsedResult = parse(
    nextEnvResult.loadedEnvFiles.map(e => e.contents).join('\n')
  )

  /**
   * parsedResult does not account for overwrites but gives us a way to get the
   * keys we are looking for in process.env.
   *
   * To get the actual .env variable values respecting the .env read order, we
   * get them from process.env and return the results.
   */
  const res: Record<string, string | undefined> = {}
  // eslint-disable-next-line github/array-foreach
  Object.keys(parsedResult).forEach(k => {
    res[k] = nextEnvResult.combinedEnv[k]
  })

  return res
}

const exportEnvVariables = (env: Record<string, string | undefined>): void => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in env) {
    if (env[key] && typeof env[key] === 'string') {
      core.setSecret(env[key] as string)
      core.exportVariable(key, env[key])
    }
  }
}

async function run(): Promise<void> {
  core.debug(`Starting ...`)
  try {
    core.debug(`Reading input ...`)
    const {environment, pathToEnv, workingDirectory} = getInput()

    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Reading environment ...`)
    exportEnvVariables(
      loadEnvVariables(environment, workingDirectory, pathToEnv)
    )
    core.debug(`Read environment and set secrets ...`)

    // sets the step's output parameter.
    core.setOutput('loadedEnv', true)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }

  core.debug(`Ended ...`)
}

run()
