// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import { TextEncoder, TextDecoder } from 'util'
import { config } from 'dotenv'

config({ path: path.resolve(process.cwd(), '.env.example') })
// eslint-disable-next-line @typescript-eslint/naming-convention
Object.assign(globalThis, { TextDecoder, TextEncoder })
Object.assign(globalThis, {
  setImmediate: global.setImmediate || ((fn: (...args: any[]) => void, ...args: any) => global.setTimeout(fn, 0, ...args))
})
