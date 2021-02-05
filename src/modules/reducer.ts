import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'
import { translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { storageReducer as storage } from 'decentraland-dapps/dist/modules/storage/reducer'
import { transactionReducer as transaction } from 'decentraland-dapps/dist/modules/transaction/reducer'
import { profileReducer as profile } from 'decentraland-dapps/dist/modules/profile/reducer'
import { modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { manaReducer as mana } from './mana/reducer'
import { identityReducer as identity } from './identity/reducer'
import { locationReducer as location } from './location/reducer'
import { authReducer as auth } from './auth/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    auth,
    profile,
    storage,
    transaction,
    translation,
    wallet,
    modal,
    mana,
    identity,
    location,
    router: connectRouter(history),
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
