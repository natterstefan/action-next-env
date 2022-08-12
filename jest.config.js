/* eslint-disable import/no-commonjs */
/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  preset: 'jest-preset-ns',
  globals: {
    /**
     * @see https://github.com/natterstefan/jest-preset-ns/issues/4#issuecomment-765416205
     * @type {import('ts-jest').GlobalConfigTsJest["ts-jest"]}
     */
    'ts-jest': {
      diagnostics: true,
      tsconfig: 'tsconfig.json'
    }
  },
  verbose: true
}
