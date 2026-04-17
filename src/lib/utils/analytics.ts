/**
 * Analytics stubs replacing decentraland-dapps analytics module.
 * Real analytics is handled by AnalyticsProvider from @dcl/hooks.
 */

export const createAnalyticsMiddleware = (_apiKey?: string) => () => (next: any) => (action: any) => next(action)

export const createAnalyticsSaga = () =>
  function* analyticsSaga() {
    /* noop */
  }

export function add(_eventName: string, _eventType?: string) {
  // Analytics tracking is now handled by @dcl/hooks AnalyticsProvider
}

export function getAnalytics() {
  return {
    track: (_event: string, _properties?: Record<string, any>) => {}
  }
}

export enum EventName {}

export type GetPayload<T = any> = T

export enum ApplicationName {
  DAPPS = 'dapps',
  EXPLORER = 'explorer'
}
