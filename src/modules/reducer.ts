import { authorizationReducer as authorization } from 'decentraland-dapps/dist/modules/authorization/reducer'
import { featuresReducer as features } from 'decentraland-dapps/dist/modules/features/reducer'
import { gatewayReducer as gateway } from 'decentraland-dapps/dist/modules/gateway/reducer'
import { modalReducer as modal } from 'decentraland-dapps/dist/modules/modal/reducer'
import { profileReducer as profile } from 'decentraland-dapps/dist/modules/profile/reducer'
import { storageReducer as storage } from 'decentraland-dapps/dist/modules/storage/reducer'
import { toastReducer as toast } from 'decentraland-dapps/dist/modules/toast/reducer'
import { transactionReducer as transaction } from 'decentraland-dapps/dist/modules/transaction/reducer'
import { translationReducer as translation } from 'decentraland-dapps/dist/modules/translation/reducer'
import { walletReducer as wallet } from 'decentraland-dapps/dist/modules/wallet/reducer'
import { combineReducers } from 'redux'
import { manaReducer as mana } from './mana/reducer'
import { subscriptionReducer as subscription } from './subscription/reducer'

export const createRootReducer = () =>
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
    subscription
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
