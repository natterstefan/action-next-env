import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import * as core from '@actions/core'

import {Input} from '../src/types'

let mockInput: Partial<Input> = {}

jest.mock('@actions/core', () => ({
  ...jest.requireActual('@actions/core'),
  getInput: jest.fn((name: keyof Input, options?: core.InputOptions) => {
    const input = mockInput[name]

    if (!input && options && options.required) {
      throw new Error(`Input missing: ${name}`)
    }

    return input
  })
}))

const mockJoin = jest.fn((...args) => jest.requireActual('path').join(...args))
jest.mock('path', () => ({
  join: (...args: string[]) => mockJoin(...args)
}))

describe('action-next-env', () => {
  beforeEach(() => {
    mockInput = {}
    mockJoin.mockClear()
    // because we use require() in some cases
    jest.resetModules()
  })

  // shows how the runner will run a javascript action with env / stdout protocol
  // eslint-disable-next-line jest/expect-expect
  it('runs', () => {
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }

    // eslint-disable-next-line no-console
    console.log(cp.execFileSync(np, [ip], options).toString())
  })

  it('sets process.env variables', () => {
    expect(process.env.HELLO).toBeUndefined()
    expect(process.env.ANSWER).toBeUndefined()

    // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
    require('../src/main.ts')

    expect(process.env.HELLO).toBe('SUN')
    expect(process.env.ANSWER).toBe('42')
  })

  it('does not overwrite existing env variables', () => {
    process.env.HELLO = 'MOON'

    // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
    require('../src/main.ts')

    expect(process.env.HELLO).toBe('MOON')
  })

  it('does work with custom inputs', () => {
    mockInput = {
      'working-directory': 'custom-directory',
      path: 'path-to-env-file'
    }

    // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
    require('../src/main.ts')

    expect(mockJoin).toHaveBeenNthCalledWith(
      1,
      'custom-directory',
      'path-to-env-file'
    )
  })
})
