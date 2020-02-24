import 'regenerator-runtime/runtime'

// Setup fetch mock
// @ts-ignore
global.fetch = require('jest-fetch-mock')

console.error = (error: string) => {
  throw Error(error)
}

console.warn = (warn: string) => {
  throw Error(warn)
}
