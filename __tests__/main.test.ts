import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

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
