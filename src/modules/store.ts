import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Env } from '@dcl/ui-env'
import { createAnalyticsMiddleware } from 'decentraland-dapps/dist/modules/analytics/middleware'
import { CreditsClient } from 'decentraland-dapps/dist/modules/credits/CreditsClient'
import { SET_PURCHASE } from 'decentraland-dapps/dist/modules/gateway/actions'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'decentraland-dapps/dist/modules/transaction/middleware'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagasMiddleware from 'redux-saga'
import { config } from '../config'
import { SET_DEPOSIT_STATUS, SET_WITHDRAWAL_STATUS, WATCH_DEPOSIT_STATUS_SUCCESS, WATCH_WITHDRAWAL_STATUS_SUCCESS } from './mana/actions'
import migrations from './migrations'
import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/account' : undefined

export const history = createBrowserHistory({ basename })
const rootReducer = storageReducerWrapper(createRootReducer())

const sagasMiddleware = createSagasMiddleware({ context: { history } })
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) => config.is(Env.DEVELOPMENT) || action.type.includes('Failure')
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

const middleware = applyMiddleware(sagasMiddleware, loggerMiddleware, transactionMiddleware, storageMiddleware, analyticsMiddleware)
const enhancer = compose(middleware)
const store = createStore(rootReducer, enhancer)

const getIdentity = () => {
  const address = getAddress(store.getState())
  const identity = address ? localStorageGetIdentity(address) : null
  return identity ?? undefined
}

const notificationApi = new NotificationsAPI({
  identity: getIdentity
})

const creditsClient = new CreditsClient(config.get('CREDITS_SERVER_URL'), {
  identity: getIdentity
})

sagasMiddleware.run(rootSaga, notificationApi, creditsClient)
loadStorageMiddleware(store)

if (config.is(Env.DEVELOPMENT)) {
  const _window = window as any
  _window.store = store
}

export { store }
