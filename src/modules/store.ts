import { applyMiddleware, compose, createStore } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'decentraland-dapps/dist/modules/transaction/middleware'
import { createAnalyticsMiddleware } from 'decentraland-dapps/dist/modules/analytics/middleware'

import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'
import {
  SET_DEPOSIT_STATUS,
  SET_WITHDRAWAL_STATUS,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  WATCH_WITHDRAWAL_STATUS_SUCCESS,
} from './mana/actions'

const isDev = process.env.NODE_ENV === 'development'

export const history = require('history').createBrowserHistory()
const rootReducer = storageReducerWrapper(createRootReducer(history))

const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) => isDev || action.type.includes('Failure'),
})

const transactionMiddleware = createTransactionMiddleware()
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'account',
  paths: [
    ['mana', 'data', 'deposits'],
    ['mana', 'data', 'withdrawals'],
  ],
  actions: [
    SET_DEPOSIT_STATUS,
    SET_WITHDRAWAL_STATUS,
    WATCH_DEPOSIT_STATUS_SUCCESS,
    WATCH_WITHDRAWAL_STATUS_SUCCESS,
  ],
  migrations: {},
})
const analyticsMiddleware = createAnalyticsMiddleware(
  process.env.REACT_APP_SEGMENT_API_KEY || ''
)

const middleware = applyMiddleware(
  sagasMiddleware,
  routerMiddleware(history),
  loggerMiddleware,
  transactionMiddleware,
  storageMiddleware,
  analyticsMiddleware
)
const enhancer = compose(middleware)
const store = createStore(rootReducer, enhancer)

sagasMiddleware.run(rootSaga)
loadStorageMiddleware(store)

if (isDev) {
  const _window = window as any
  _window.store = store
}

export { store }
