import { getAddress } from '@dcl/core-web3'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Env } from '@dcl/ui-env'
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagasMiddleware from 'redux-saga'
import { config } from '../config'
import { CreditsSettingsAPI } from '../lib/api/credits'
import { NotificationsAPI } from '../lib/notifications/NotificationsAPI'
import { rootReducer } from '../modules/reducer'
import { rootSaga } from '../modules/sagas'

const persistedReducer = persistReducer(
  {
    key: 'account',
    storage,
    whitelist: ['mana']
  },
  rootReducer as any
)

const sagasMiddleware = createSagasMiddleware()

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(sagasMiddleware),
  devTools: config.is(Env.DEVELOPMENT)
})

const persistor = persistStore(store)

// Identity helper for API authentication
const getIdentity = () => {
  const address = getAddress(store.getState() as any)
  const identity = address ? localStorageGetIdentity(address) : null
  return identity ?? undefined
}

const notificationApi = new NotificationsAPI({
  identity: getIdentity as any
})

const creditsSettingsAPI = new CreditsSettingsAPI(config.get('CREDITS_SERVER_URL'), {
  identity: getIdentity as any
})

sagasMiddleware.run(rootSaga, notificationApi, creditsSettingsAPI)

if (config.is(Env.DEVELOPMENT)) {
  ;(window as any).store = store
}

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>

export { store, persistor }
