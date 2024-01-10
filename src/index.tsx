import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'

import './modules/analytics/track'
import './modules/analytics/sentry'

// import './themes'

import { store, history } from './modules/store'
import { Routes } from './components/Routes'
import * as locales from './locales'
import * as modals from './components/Modals'

import 'decentraland-ui/dist/themes/alternative/light-theme.css'
import './index.css'

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
