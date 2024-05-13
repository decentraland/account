// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import { TextDecoder, TextEncoder } from 'util'
import { mergeTranslations, setCurrentLocale } from 'decentraland-dapps/dist/modules/translation'
import { en } from 'decentraland-dapps/dist/modules/translation/defaults'
import { config } from 'dotenv'
import flatten from 'flat'
import fetch, { Request, Response } from 'node-fetch'
import * as locales from '../locales'

config({ path: path.resolve(process.cwd(), '.env.example') })

setCurrentLocale('en', mergeTranslations(flatten(en), flatten(locales.en)))

if (!globalThis.fetch) {
  globalThis.fetch = fetch as any
  globalThis.Request = Request as any
  globalThis.Response = Response as any
}

Object.assign(globalThis, { TextDecoder, TextEncoder })
Object.assign(globalThis, {
  setImmediate: global.setImmediate || ((fn: (...args: any[]) => void, ...args: any) => global.setTimeout(fn, 0, ...args))
})
