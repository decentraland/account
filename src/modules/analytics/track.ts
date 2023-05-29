import {
  EventName,
  GetPayload,
} from 'decentraland-dapps/dist/modules/analytics/types'
import {
  FETCH_TRANSACTION_FAILURE,
  FIX_REVERTED_TRANSACTION,
  REPLACE_TRANSACTION_SUCCESS,
  FetchTransactionFailureAction,
  FixRevertedTransactionAction,
  ReplaceTransactionSuccessAction,
} from 'decentraland-dapps/dist/modules/transaction/actions'
import { add } from 'decentraland-dapps/dist/modules/analytics/utils'
import { PayloadAction } from 'typesafe-actions'
import { TransactionStatus } from 'decentraland-dapps/dist/modules/transaction/types'
import {
  SetPurchaseAction,
  SET_PURCHASE,
} from 'decentraland-dapps/dist/modules/gateway/actions'
import { PurchaseStatus } from 'decentraland-dapps/dist/modules/gateway/types'
import {
  DepositManaFailureAction,
  DepositManaSuccessAction,
  DEPOSIT_MANA_SUCCESS,
  DEPOSIT_MANA_FAILURE,
  TransferManaFailureAction,
  TransferManaSuccessAction,
  TRANSFER_MANA_FAILURE,
  TRANSFER_MANA_SUCCESS,
  InitiateWithdrawalSuccessAction,
  INITIATE_WITHDRAWAL_SUCCESS,
  INITIATE_WITHDRAWAL_FAILURE,
  InitiateWithdrawalFailureAction,
  FinishWithdrawalSuccessAction,
  FINISH_WITHDRAWAL_SUCCESS,
  FinishWithdrawalFailureAction,
  FINISH_WITHDRAWAL_FAILURE,
  APPROVE_MANA_SUCCESS,
  APPROVE_MANA_FAILURE,
  ApproveManaSuccessAction,
  ApproveManaFailureAction,
} from '../mana/actions'

function track<T extends PayloadAction<string, any>>(
  actionType: string,
  eventName: string | ((action: T) => string),
  getPayload = (action: T) => action.payload
) {
  add(actionType, eventName as EventName, getPayload as GetPayload)
}

track<FetchTransactionFailureAction>(FETCH_TRANSACTION_FAILURE, ({ payload }) =>
  payload.status === TransactionStatus.REVERTED
    ? 'Transaction Failed'
    : 'Transaction Dropped'
)

track<FixRevertedTransactionAction>(
  FIX_REVERTED_TRANSACTION,
  'Transaction Fixed'
)

track<ReplaceTransactionSuccessAction>(
  REPLACE_TRANSACTION_SUCCESS,
  'Transaction Replaced'
)

track<TransferManaSuccessAction>(
  TRANSFER_MANA_SUCCESS,
  'Transfer Mana',
  (action) => action.payload.transfer
)

track<TransferManaFailureAction>(
  TRANSFER_MANA_FAILURE,
  'Transfer Mana Error',
  (action) => ({ error: action.payload.error })
)

track<DepositManaSuccessAction>(
  DEPOSIT_MANA_SUCCESS,
  'Deposit Mana',
  (action) => ({ amount: action.payload.amount })
)

track<DepositManaFailureAction>(
  DEPOSIT_MANA_FAILURE,
  'Deposit Mana Error',
  (action) => ({ error: action.payload.error })
)

track<InitiateWithdrawalSuccessAction>(
  INITIATE_WITHDRAWAL_SUCCESS,
  'Initiate Withdrawal',
  (action) => ({ amount: action.payload.amount })
)

track<InitiateWithdrawalFailureAction>(
  INITIATE_WITHDRAWAL_FAILURE,
  'Initiate Withdrawal Error',
  (action) => ({ error: action.payload.error })
)

track<FinishWithdrawalSuccessAction>(
  FINISH_WITHDRAWAL_SUCCESS,
  'Finish Withdrawal',
  (action) => action.payload.withdrawal
)

track<FinishWithdrawalFailureAction>(
  FINISH_WITHDRAWAL_FAILURE,
  'Finish Withdrawal Error',
  (action) => ({ error: action.payload.error })
)

track<SetPurchaseAction>(
  SET_PURCHASE,
  (action) =>
    action.payload.purchase.status === PurchaseStatus.CANCELLED
      ? 'Purchase Cancelled'
      : action.payload.purchase.status === PurchaseStatus.COMPLETE
      ? 'Purchase Complete'
      : action.payload.purchase.status === PurchaseStatus.FAILED
      ? 'Purchase Failed'
      : action.payload.purchase.status === PurchaseStatus.REFUNDED
      ? 'Purchase Refunded'
      : 'Purchase Started',
  (action) => action.payload.purchase
)

track<ApproveManaSuccessAction>(
  APPROVE_MANA_SUCCESS,
  'Approve Mana',
  (action) => ({ allowance: action.payload.allowance })
)

track<ApproveManaFailureAction>(
  APPROVE_MANA_FAILURE,
  'Approve Mana Error',
  (action) => ({ error: action.payload.error })
)
