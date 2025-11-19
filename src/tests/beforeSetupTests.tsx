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

// Mock HTMLCanvasElement.prototype.getContext para lottie-web
if (typeof HTMLCanvasElement !== 'undefined') {
  const originalGetContext = HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = function (contextType: string, ...args: any[]) {
    if (contextType === '2d') {
      return {
        canvas: this,
        fillStyle: '#000000',
        strokeStyle: '#000000',
        lineWidth: 1,
        lineCap: 'butt',
        lineJoin: 'miter',
        miterLimit: 10,
        globalAlpha: 1.0,
        globalCompositeOperation: 'source-over',
        save: jest.fn(),
        restore: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        translate: jest.fn(),
        transform: jest.fn(),
        setTransform: jest.fn(),
        resetTransform: jest.fn(),
        createLinearGradient: jest.fn(() => ({
          addColorStop: jest.fn()
        })),
        createRadialGradient: jest.fn(() => ({
          addColorStop: jest.fn()
        })),
        createPattern: jest.fn(),
        clearRect: jest.fn(),
        fillRect: jest.fn(),
        strokeRect: jest.fn(),
        beginPath: jest.fn(),
        closePath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        bezierCurveTo: jest.fn(),
        quadraticCurveTo: jest.fn(),
        arc: jest.fn(),
        arcTo: jest.fn(),
        rect: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        drawFocusIfNeeded: jest.fn(),
        clip: jest.fn(),
        isPointInPath: jest.fn(() => false),
        isPointInStroke: jest.fn(() => false),
        fillText: jest.fn(),
        strokeText: jest.fn(),
        measureText: jest.fn(() => ({
          width: 0,
          actualBoundingBoxLeft: 0,
          actualBoundingBoxRight: 0,
          fontBoundingBoxAscent: 0,
          fontBoundingBoxDescent: 0,
          actualBoundingBoxAscent: 0,
          actualBoundingBoxDescent: 0,
          emHeightAscent: 0,
          emHeightDescent: 0,
          hangingBaseline: 0,
          alphabeticBaseline: 0,
          ideographicBaseline: 0
        })),
        drawImage: jest.fn(),
        createImageData: jest.fn(() => ({
          data: new Uint8ClampedArray(0),
          width: 0,
          height: 0
        })),
        getImageData: jest.fn(() => ({
          data: new Uint8ClampedArray(0),
          width: 0,
          height: 0
        })),
        putImageData: jest.fn(),
        getContextAttributes: jest.fn(() => ({})),
        setLineDash: jest.fn(),
        getLineDash: jest.fn(() => []),
        createImageDataFromImageData: jest.fn()
      } as any
    }
    return originalGetContext ? originalGetContext.call(this, contextType as any, ...args) : null
  }
}
