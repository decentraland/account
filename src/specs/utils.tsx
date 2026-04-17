import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { TranslationProvider } from '@dcl/hooks'
import { render } from '@testing-library/react'
import { Store } from 'redux'
import * as locales from '../locales'
import { RootState } from '../modules/reducer'
import { createTestStore } from './store'

export function renderWithProviders(
  component: ReactNode,
  { preloadedState, store }: { preloadedState?: Partial<RootState>; store?: Store } = {}
) {
  const initializedStore = store || createTestStore(preloadedState || {})

  function AppProviders({ children }: { children: ReactNode }) {
    return (
      <Provider store={initializedStore}>
        <TranslationProvider locale="en" translations={{ en: locales.en }} fallbackLocale="en">
          <MemoryRouter>{children}</MemoryRouter>
        </TranslationProvider>
      </Provider>
    )
  }

  return render(component, { wrapper: AppProviders })
}
