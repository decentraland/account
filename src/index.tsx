// eslint-disable-next-line css-import-order/css-import-order
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import { dark } from 'decentraland-ui2/dist/theme'
import { ThemeProvider } from 'decentraland-ui2'
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
      <ThemeProvider theme={dark}>
        <ToastProvider>
          <WalletProvider>
            <ModalProvider components={modals}>
              <Router history={history}>
                <Routes />
              </Router>
            </ModalProvider>
          </WalletProvider>
        </ToastProvider>
      </ThemeProvider>
    </TranslationProvider>
  </Provider>
)

ReactDOM.render(component, document.getElementById('root'))
