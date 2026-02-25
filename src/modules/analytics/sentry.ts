import { Env } from '@dcl/ui-env/dist/env'
import { browserTracingIntegration, init, replayIntegration } from '@sentry/react'
import { config } from '../../config'

init({
  environment: config.get('ENVIRONMENT'),
  release: `${config.get('SENTRY_RELEASE_PREFIX', 'account')}@${process.env.REACT_APP_WEBSITE_VERSION}`,
  dsn: config.get('SENTRY_DSN'),
  integrations: [browserTracingIntegration(), replayIntegration()],
  // Performance Monitoring
  tracesSampleRate: 0.001,
  // Session Replay
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 0.01,
  enabled: !config.is(Env.DEVELOPMENT)
})
