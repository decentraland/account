import { networkReducer, transactionsReducer, walletReducer } from '@dcl/core-web3'
import { combineReducers } from '@reduxjs/toolkit'
import { creditsSettingsReducer as creditsSettings } from './creditsSettings/reducer'
import { manaReducer as mana } from './mana/reducer'
import { modalReducer as modal } from './modal/reducer'
import { subscriptionReducer as subscription } from './subscription/reducer'

export const rootReducer = combineReducers({
  wallet: walletReducer,
  network: networkReducer,
  transactions: transactionsReducer,
  modal,
  mana,
  creditsSettings,
  subscription
})

export type RootState = ReturnType<typeof rootReducer>
