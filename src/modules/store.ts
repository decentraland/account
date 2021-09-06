import { applyMiddleware, compose, createStore } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'decentraland-dapps/dist/modules/transaction/middleware'
import { createAnalyticsMiddleware } from 'decentraland-dapps/dist/modules/analytics/middleware'
import { createRootReducer, RootState } from './reducer'
import { rootSaga } from './sagas'
import {
  SET_DEPOSIT_STATUS,
  SET_PURCHASE,
  SET_WITHDRAWAL_STATUS,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  WATCH_WITHDRAWAL_STATUS_SUCCESS,
} from './mana/actions'
import { isDevelopment } from '../lib/environment'
import { Withdrawal } from './mana/types'

export const history = require('history').createBrowserHistory()
const rootReducer = storageReducerWrapper(createRootReducer(history))

const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) =>
    isDevelopment || action.type.includes('Failure'),
})

const transactionMiddleware = createTransactionMiddleware()
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'account',
  paths: [
    ['mana', 'data', 'deposits'],
    ['mana', 'data', 'withdrawals'],
    ['mana', 'data', 'purchases'],
  ],
  actions: [
    SET_DEPOSIT_STATUS,
    SET_WITHDRAWAL_STATUS,
    WATCH_DEPOSIT_STATUS_SUCCESS,
    WATCH_WITHDRAWAL_STATUS_SUCCESS,
    SET_PURCHASE,
  ],
  migrations: {
    '2': (state: RootState) => {
      const oldWithdrawals = state.mana.data.withdrawals
      const oldTransactions = state.transaction.data

      const mapOldWithdrawal = (withdrawal: any): Withdrawal => ({
        amount: withdrawal.amount,
        from: withdrawal.from,
        status: withdrawal.status,
        timestamp: withdrawal.timestamp,
        finalizeHash: null,
        initializeHash: (withdrawal as any).hash,
      })

      const updatedWithdrawals = oldWithdrawals.map(mapOldWithdrawal)
      const updatedTransactions = oldTransactions.map((transaction) => ({
        ...transaction,
        payload:
          transaction.payload && transaction.payload.withdrawal
            ? {
                ...transaction.payload,
                withdrawal: mapOldWithdrawal(transaction.payload.withdrawal),
              }
            : transaction.payload,
      }))

      return {
        ...state,
        mana: {
          ...state.mana,
          data: {
            ...state.mana.data,
            withdrawals: updatedWithdrawals,
          },
        },
        transaction: {
          ...state.transaction,
          data: updatedTransactions,
        },
      }
    },
  },
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

if (isDevelopment) {
  const _window = window as any
  _window.store = store
}

export { store }
