import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'

import './modules/analytics/track'
import './modules/analytics/sentry'

import * as modals from './components/Modals'
import { Routes } from './components/Routes'
import * as locales from './locales'
import { history, store } from './modules/store'
import './themes'

import './index.css'
import 'semantic-ui-css/semantic.min.css'
import 'decentraland-ui/dist/themes/alternative/light-theme.css'

const component = (
  <Provider store={store}>
    <TranslationProvider locales={Object.keys(locales)}>
      <ToastProvider>
        <WalletProvider>
          <ModalProvider components={modals}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </ModalProvider>
        </WalletProvider>
      </ToastProvider>
    </TranslationProvider>
  </Provider>
)

ReactDOM.render(component, document.getElementById('root'))
