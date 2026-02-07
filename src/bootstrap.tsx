// eslint-disable-next-line css-import-order/css-import-order
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { Web2TransactionModal } from 'decentraland-dapps/dist/containers'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import { createRoot } from 'react-dom/client'
import { DclThemeProvider, darkTheme } from 'decentraland-ui2'
import './modules/analytics/track'
import './modules/analytics/sentry'
import * as modals from './components/Modals'
import { Routes } from './components/Routes'
import * as locales from './locales'
import { history, store } from './modules/store'

// eslint-disable-next-line css-import-order/css-import-order
import 'decentraland-ui/dist/themes/alternative/dark-theme.css'
// eslint-disable-next-line css-import-order/css-import-order
import './themes'
// eslint-disable-next-line css-import-order/css-import-order
import './index.css'

const component = (
  <Provider store={store}>
    <TranslationProvider locales={Object.keys(locales)}>
      <DclThemeProvider theme={darkTheme}>
        <ToastProvider>
          <WalletProvider>
            <ModalProvider components={modals}>
              <Router history={history}>
                <Routes />
              </Router>
            </ModalProvider>
            <Web2TransactionModal />
          </WalletProvider>
        </ToastProvider>
      </DclThemeProvider>
    </TranslationProvider>
  </Provider>
)

const root = createRoot(document.getElementById('root')!)
root.render(component)
