import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Web3CoreProvider, Web3SyncProvider } from '@dcl/core-web3'
import { TranslationProvider } from '@dcl/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { DclThemeProvider, darkTheme } from 'decentraland-ui2'
import { persistor, store } from './app/store'
import { LegacyEmailConfirmRedirect } from './components/LegacyEmailConfirmRedirect'
import { MainPage } from './components/MainPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignInPage } from './components/SignInPage'
import { UnifiedEmailConfirmation } from './components/UnifiedEmailConfirmation'
import { web3Config } from './features/web3/web3.config'
import * as translations from './locales'

import './index.css'

const queryClient = new QueryClient()

export default function AccountRemote() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Web3CoreProvider config={web3Config}>
            <Web3SyncProvider>
              <DclThemeProvider theme={darkTheme}>
                <TranslationProvider locale="en" translations={{ en: translations.en }} fallbackLocale="en">
                  <Routes>
                    <Route path="/confirm-email-challenge/:token" element={<UnifiedEmailConfirmation />} />
                    <Route path="/confirm-email/:token" element={<LegacyEmailConfirmRedirect path="/confirm-email/:token" />} />
                    <Route
                      path="/credits-email-confirmed/:token"
                      element={<LegacyEmailConfirmRedirect path="/credits-email-confirmed/:token" />}
                    />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <MainPage />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </TranslationProvider>
              </DclThemeProvider>
            </Web3SyncProvider>
          </Web3CoreProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}
