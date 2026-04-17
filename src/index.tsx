import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Web3CoreProvider, Web3SyncProvider } from '@dcl/core-web3'
import { AnalyticsProvider, TranslationProvider } from '@dcl/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { DclThemeProvider, darkTheme } from 'decentraland-ui2'
import { persistor, store } from './app/store'
import { config } from './config'
import { web3Config } from './features/web3/web3.config'
import * as translations from './locales'
import { router } from './routes'

import './modules/analytics/sentry'

// eslint-disable-next-line css-import-order/css-import-order
import './index.css'

const queryClient = new QueryClient()

const component = (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Web3CoreProvider config={web3Config}>
            <Web3SyncProvider>
              <DclThemeProvider theme={darkTheme}>
                <AnalyticsProvider writeKey={config.get('SEGMENT_API_KEY') || ''}>
                  <TranslationProvider locale="en" translations={{ en: translations.en }} fallbackLocale="en">
                    <RouterProvider router={router} />
                  </TranslationProvider>
                </AnalyticsProvider>
              </DclThemeProvider>
            </Web3SyncProvider>
          </Web3CoreProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)

const root = createRoot(document.getElementById('root')!)
root.render(component)
