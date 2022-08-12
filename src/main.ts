import path from 'path'

import * as core from '@actions/core'
import {DotenvParseOutput, parse} from 'dotenv'
import {loadEnvConfig} from '@next/env'

type Environment = 'test' | 'production' | 'development'

const getInput = (): {environment: Environment; pathToEnv: string} => {
  const environment = core.getInput('environment') as Environment
  const pathToEnv = core.getInput('path') || '.'

  return {
    environment,
    pathToEnv
  }
}

const loadEnvVariables = (
  mode: Environment,
  pathToEnv: string
): DotenvParseOutput => {
  const isDevelopment = mode !== 'production'

  const result = loadEnvConfig(path.join(pathToEnv), isDevelopment, {
    info: core.debug,
    error: core.error
  })

  return parse(result.loadedEnvFiles.map(e => e.contents).join('\n'))
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
  try {
    const {environment, pathToEnv} = getInput()

    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Reading environment ...`)
    exportEnvVariables(loadEnvVariables(environment, pathToEnv))
    core.debug(`Read environment and set secrets ...`)

    core.setOutput('loadedEnv', true)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
