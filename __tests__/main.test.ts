import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

describe('action-next-env', () => {
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
})
