import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { CreditsClient } from 'decentraland-dapps/dist/modules/credits/CreditsClient'
import { SET_PURCHASE } from 'decentraland-dapps/dist/modules/gateway'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { STORAGE_LOAD } from 'decentraland-dapps/dist/modules/storage/actions'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'decentraland-dapps/dist/modules/transaction/middleware'
import { getAddress } from 'ethers/lib/utils'
import { createMemoryHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { config } from '../config'
import { CreditsSettingsAPI } from '../lib/api/credits'
import {
  SET_DEPOSIT_STATUS,
  SET_WITHDRAWAL_STATUS,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  WATCH_WITHDRAWAL_STATUS_SUCCESS
} from '../modules/mana/actions'
import migrations from '../modules/migrations'
import { createRootReducer } from '../modules/reducer'
import { rootSaga } from '../modules/sagas'

export function initTestStore(preloadedState = {}) {
  const testHistory = createMemoryHistory({ initialEntries: ['/marketplace'] })
  const rootReducer = storageReducerWrapper(createRootReducer())
  const sagasMiddleware = createSagasMiddleware({ context: { history: testHistory } })
  const transactionMiddleware = createTransactionMiddleware()
  const { storageMiddleware } = createStorageMiddleware({
    storageKey: 'account',
    paths: [
      ['mana', 'data', 'deposits'],
      ['mana', 'data', 'withdrawals'],
      ['mana', 'data', 'purchases']
    ],
    actions: [SET_DEPOSIT_STATUS, SET_WITHDRAWAL_STATUS, WATCH_DEPOSIT_STATUS_SUCCESS, WATCH_WITHDRAWAL_STATUS_SUCCESS, SET_PURCHASE],
    migrations
  })

  const middleware = applyMiddleware(sagasMiddleware, transactionMiddleware, storageMiddleware)
  const enhancer = compose(middleware)
  const store = createStore(rootReducer, preloadedState, enhancer)

  const notificationApi = new NotificationsAPI({
    identity: () => {
      const address = getAddress(store.getState() as any)
      const identity = address ? localStorageGetIdentity(address) : null
      return identity ?? undefined
    }
  })

  const creditsClient = new CreditsClient(config.get('CREDITS_SERVER_URL'))

  const creditsSettingsAPI = new CreditsSettingsAPI(config.get('CREDITS_SERVER_URL'), {
    identity: () => {
      const address = getAddress(store.getState() as any)
      const identity = address ? localStorageGetIdentity(address) : null
      return identity ?? undefined
    }
  })

  sagasMiddleware.run(rootSaga, notificationApi, creditsClient, creditsSettingsAPI)
  // Dispatch STORAGE_LOAD synchronously to avoid race conditions in tests
  store.dispatch({ type: STORAGE_LOAD, payload: {} })

  return store
}
