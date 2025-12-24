import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { en } from 'decentraland-dapps/dist/modules/translation/defaults'
import { I18nProvider, mergeTranslations } from 'decentraland-dapps/dist/modules/translation/utils'
import flatten from 'flat'
import { createMemoryHistory } from 'history'
import { Store } from 'redux'
import * as locales from '../locales'
import { RootState } from '../modules/reducer'
import { initTestStore } from './store'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const allTranslations = mergeTranslations(flatten(en) as unknown as Record<string, string>, flatten(locales.en))

export function renderWithProviders(
  component: ReactNode,
  { preloadedState, store }: { preloadedState?: Partial<RootState>; store?: Store } = {}
) {
  const initializedStore =
    store ||
    initTestStore({
      ...(preloadedState || {}),
      storage: { loading: false, version: 1 },
      translation: {
        data: {
          en: allTranslations,
          'en-EN': allTranslations
        },
        locale: 'en-EN',
        loading: [],
        error: null
      }
    })

  const history = createMemoryHistory()

  function AppProviders({ children }: { children: ReactNode }) {
    return (
      <Provider store={initializedStore}>
        <I18nProvider locale="en" messages={allTranslations}>
          <Router history={history}>{children}</Router>
        </I18nProvider>
      </Provider>
    )
  }

  return render(component, { wrapper: AppProviders })
}
