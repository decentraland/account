import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'
import { translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { storageReducer as storage } from 'decentraland-dapps/dist/modules/storage/reducer'
import { transactionReducer as transaction } from 'decentraland-dapps/dist/modules/transaction/reducer'
import { profileReducer as profile } from 'decentraland-dapps/dist/modules/profile/reducer'
import { modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { toastReducer as toast } from 'decentraland-dapps/dist/modules/toast/reducer'
import { featuresReducer as features } from 'decentraland-dapps/dist/modules/features/reducer'
import { gatewayReducer as gateway } from 'decentraland-dapps/dist/modules/gateway/reducer'
import { authorizationReducer as authorization } from 'decentraland-dapps/dist/modules/authorization/reducer'
import { manaReducer as mana } from './mana/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    authorization,
    profile,
    storage,
    transaction,
    translation,
    wallet,
    modal,
    mana,
    toast,
    gateway,
    features,
    router: connectRouter(history),
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
