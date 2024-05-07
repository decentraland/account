import { Env } from '@dcl/ui-env'
import { routerMiddleware } from 'connected-react-router'
import { createAnalyticsMiddleware } from 'decentraland-dapps/dist/modules/analytics/middleware'
import { SET_PURCHASE } from 'decentraland-dapps/dist/modules/gateway/actions'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'decentraland-dapps/dist/modules/transaction/middleware'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagasMiddleware from 'redux-saga'

import { SET_DEPOSIT_STATUS, SET_WITHDRAWAL_STATUS, WATCH_DEPOSIT_STATUS_SUCCESS, WATCH_WITHDRAWAL_STATUS_SUCCESS } from './mana/actions'
import migrations from './migrations'
import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'
import { config } from '../config'
import { isTest } from '../lib/environment'

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/account' : undefined

export const history = createBrowserHistory({ basename })
const rootReducer = storageReducerWrapper(createRootReducer(history))

const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) => !isTest && (config.is(Env.DEVELOPMENT) || action.type.includes('Failure'))
})

const transactionMiddleware = createTransactionMiddleware()
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'account',
  paths: [
    ['mana', 'data', 'deposits'],
    ['mana', 'data', 'withdrawals'],
    ['mana', 'data', 'purchases']
  ],
  actions: [SET_DEPOSIT_STATUS, SET_WITHDRAWAL_STATUS, WATCH_DEPOSIT_STATUS_SUCCESS, WATCH_WITHDRAWAL_STATUS_SUCCESS, SET_PURCHASE],
  migrations
})
const analyticsMiddleware = createAnalyticsMiddleware(config.get('SEGMENT_API_KEY'))

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

if (config.is(Env.DEVELOPMENT)) {
  const _window = window as any
  _window.store = store
}

export { store }
