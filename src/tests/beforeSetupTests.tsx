// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import { TextDecoder, TextEncoder } from 'util'
import { config } from 'dotenv'
import fetch, { Request, Response } from 'node-fetch'

config({ path: path.resolve(process.cwd(), '.env.example') })

if (!globalThis.fetch) {
  globalThis.fetch = fetch as any
  globalThis.Request = Request as any
  globalThis.Response = Response as any
}

Object.assign(globalThis, { TextDecoder, TextEncoder })
Object.assign(globalThis, {
  setImmediate: global.setImmediate || ((fn: (...args: any[]) => void, ...args: any) => global.setTimeout(fn, 0, ...args))
})
