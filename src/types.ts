/**
 * @default 'development'
 */
export type Environment = 'test' | 'production' | 'development'

export type Input = {
  environment: Environment
  path: string
  'working-directory': string
}

export type InputValues = {
  environment: Environment
  pathToEnv: string
  workingDirectory: string
}
