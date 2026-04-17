import { call, put, select, takeEvery } from 'redux-saga/effects'
import { coingecko } from '../../lib/api/coingecko'
import { closeModal } from '../modal/actions'
import { FETCH_TRANSACTION_SUCCESS, FetchTransactionSuccessAction } from '../transaction/actions'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction, fetchWalletRequest } from '../wallet/actions'
import { getAddress } from '../wallet/selectors'
import {
  APPROVE_MANA_REQUEST,
  ApproveManaRequestAction,
  DEPOSIT_MANA_REQUEST,
  DepositManaRequestAction,
  FETCH_MANA_PRICE_REQUEST,
  FINISH_WITHDRAWAL_REQUEST,
  FetchManaPriceRequestAction,
  FinishWithdrawalRequestAction,
  GET_APPROVED_MANA_REQUEST,
  GetApprovedManaRequestAction,
  IMPORT_WITHDRAWAL_REQUEST,
  INITIATE_WITHDRAWAL_REQUEST,
  ImportWithdrawalRequestAction,
  InitiateWithdrawalRequestAction,
  SET_DEPOSIT_STATUS,
  SET_WITHDRAWAL_STATUS,
  SetDepositStatusAction,
  SetWithdrawalStatusAction,
  TRANSFER_MANA_REQUEST,
  TRANSFER_MANA_SUCCESS,
  TransferManaRequestAction,
  WATCH_DEPOSIT_STATUS_REQUEST,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  WATCH_WITHDRAWAL_STATUS_REQUEST,
  WATCH_WITHDRAWAL_STATUS_SUCCESS,
  WatchDepositStatusRequestAction,
  WatchDepositStatusSuccessAction,
  WatchWithdrawalStatusRequestAction,
  WatchWithdrawalStatusSuccessAction,
  approveManaFailure,
  depositManaFailure,
  fetchManaPriceFailure,
  fetchManaPriceRequest,
  fetchManaPriceSuccess,
  finishWithdrawalFailure,
  getApprovedManaFailure,
  getApprovedManaRequest,
  getApprovedManaSuccess,
  importWithdrawalFailure,
  initiateWithdrawalFailure,
  setDepositStatus,
  setWithdrawalStatus,
  transferManaFailure,
  watchDepositStatusFailure,
  watchDepositStatusRequest,
  watchDepositStatusSuccess,
  watchWithdrawalStatusFailure,
  watchWithdrawalStatusRequest,
  watchWithdrawalStatusSuccess
} from './actions'
import { getWalletDeposits, getWalletWithdrawals } from './selectors'
import { Deposit, DepositStatus, Withdrawal, WithdrawalStatus } from './types'
import { getStoreWithdrawalByHash, waitForSync } from './utils'

export function* manaSaga() {
  yield takeEvery(SET_DEPOSIT_STATUS, handleSetDepositStatus)
  yield takeEvery(SET_WITHDRAWAL_STATUS, handleSetWithdrawalStatus)
  yield takeEvery(FETCH_TRANSACTION_SUCCESS, handleFetchTransactionSuccess)
  yield takeEvery(DEPOSIT_MANA_REQUEST, handleDepositManaRequest)
  yield takeEvery(GET_APPROVED_MANA_REQUEST, handleGetApprovedManaRequest)
  yield takeEvery(APPROVE_MANA_REQUEST, handleApproveManaRequest)
  yield takeEvery(WATCH_DEPOSIT_STATUS_REQUEST, handleWatchDepositStatusRequest)
  yield takeEvery(WATCH_DEPOSIT_STATUS_SUCCESS, handleWatchDepositStatusSuccess)
  yield takeEvery(WATCH_WITHDRAWAL_STATUS_REQUEST, handleWatchWithdrawalStatusRequest)
  yield takeEvery(WATCH_WITHDRAWAL_STATUS_SUCCESS, handleWatchWithdrawalStatusSuccess)
  yield takeEvery(INITIATE_WITHDRAWAL_REQUEST, handleInitiateWithdrawalRequest)
  yield takeEvery(FINISH_WITHDRAWAL_REQUEST, handleFinishWithdrawalRequest)
  yield takeEvery(TRANSFER_MANA_REQUEST, handleSendManaRequest)
  yield takeEvery(FETCH_MANA_PRICE_REQUEST, handleFetchManaPriceRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeEvery(IMPORT_WITHDRAWAL_REQUEST, handleImportWithdrawalRequest)
}

// TODO: Reimplement with viem/wagmi writeContract
function* handleDepositManaRequest(action: DepositManaRequestAction) {
  const { amount } = action.payload
  try {
    throw new Error('Deposit MANA: Not yet implemented with viem/wagmi')
  } catch (error: any) {
    yield put(depositManaFailure(amount, error.message))
  }
}

function* handleWatchDepositStatusRequest(action: WatchDepositStatusRequestAction) {
  const { amount, txHash } = action.payload
  const address: string | undefined = yield select(getAddress)
  if (address) {
    const deposit: Deposit = {
      hash: txHash,
      from: address,
      status: DepositStatus.PENDING,
      amount,
      timestamp: Date.now()
    }
    yield put(watchDepositStatusSuccess(deposit))
  } else {
    yield put(watchDepositStatusFailure(amount, txHash, 'Invalid address'))
  }
}

function* handleWatchDepositStatusSuccess(action: WatchDepositStatusSuccessAction) {
  const { deposit } = action.payload
  // TODO: Reimplement deposit sync watching with viem public clients
  try {
    yield call(() => waitForSync(deposit.hash, async () => false))
    yield put(setDepositStatus(deposit.hash, DepositStatus.COMPLETE))
  } catch {
    // Polling will continue
  }
}

// TODO: Reimplement with viem readContract
function* handleGetApprovedManaRequest(_action: GetApprovedManaRequestAction) {
  try {
    // Stub: return 0 allowance until viem implementation
    yield put(getApprovedManaSuccess('0'))
  } catch (error: any) {
    yield put(getApprovedManaFailure(error.message))
  }
}

// TODO: Reimplement with viem/wagmi writeContract
function* handleApproveManaRequest(action: ApproveManaRequestAction) {
  const { allowance } = action.payload
  try {
    throw new Error('Approve MANA: Not yet implemented with viem/wagmi')
  } catch (error: any) {
    yield put(closeModal('ConvertManaModal'))
    yield put(approveManaFailure(allowance, error))
  }
}

function* handleWatchWithdrawalStatusRequest(action: WatchWithdrawalStatusRequestAction) {
  const { amount, txHash } = action.payload
  const address: string | undefined = yield select(getAddress)
  if (address) {
    const tx: Withdrawal = {
      initializeHash: txHash,
      finalizeHash: null,
      from: address,
      status: WithdrawalStatus.PENDING,
      amount,
      timestamp: Date.now()
    }
    yield put(watchWithdrawalStatusSuccess(tx))
  } else {
    yield put(watchWithdrawalStatusFailure(amount, txHash, 'Invalid address'))
  }
}

// TODO: Reimplement with viem - maticjs POSClient removed
function* handleWatchWithdrawalStatusSuccess(action: WatchWithdrawalStatusSuccessAction) {
  const { withdrawal: tx } = action.payload
  try {
    yield call(() => waitForSync(tx.initializeHash, async () => false))
    yield put(setWithdrawalStatus(tx.initializeHash, WithdrawalStatus.CHECKPOINT))
  } catch {
    // Polling will continue
  }
}

// TODO: Reimplement with viem/wagmi writeContract
function* handleInitiateWithdrawalRequest(action: InitiateWithdrawalRequestAction) {
  const { amount } = action.payload
  try {
    throw new Error('Initiate withdrawal: Not yet implemented with viem/wagmi')
  } catch (error: any) {
    yield put(initiateWithdrawalFailure(amount, error.message))
  }
}

// TODO: Reimplement with viem - maticjs POSClient removed
function* handleFinishWithdrawalRequest(action: FinishWithdrawalRequestAction) {
  const { withdrawal } = action.payload
  try {
    throw new Error('Finish withdrawal: Not yet implemented with viem/wagmi')
  } catch (error: any) {
    const storeWithdrawal: Withdrawal | undefined = yield call(getStoreWithdrawalByHash, withdrawal.initializeHash)
    yield put(finishWithdrawalFailure(storeWithdrawal ?? withdrawal, error.message))
  }
}

// TODO: Reimplement with viem/wagmi writeContract
function* handleSendManaRequest(action: TransferManaRequestAction) {
  const { to, amount, network } = action.payload
  try {
    throw new Error('Transfer MANA: Not yet implemented with viem/wagmi')
  } catch (error: any) {
    yield put(transferManaFailure(to, amount, network, error.message))
  }
}

function* handleFetchManaPriceRequest(_action: FetchManaPriceRequestAction) {
  try {
    const price: number = yield call(() => coingecko.fetchManaPrice())
    yield put(fetchManaPriceSuccess(price))
  } catch (error: any) {
    yield put(fetchManaPriceFailure(error))
  }
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  yield put(fetchManaPriceRequest())
  yield put(getApprovedManaRequest())

  const deposits: Deposit[] = yield select(getWalletDeposits)
  for (const deposit of deposits) {
    if (deposit.status === DepositStatus.PENDING) {
      yield put(watchDepositStatusRequest(deposit.amount, deposit.hash))
    }
  }
  const withdrawals: Withdrawal[] = yield select(getWalletWithdrawals)
  for (const withdrawal of withdrawals) {
    if (withdrawal.status === WithdrawalStatus.PENDING) {
      yield put(watchWithdrawalStatusRequest(withdrawal.amount, withdrawal.initializeHash))
    }
  }
}

function formatImportWithdrawalError(msg: string) {
  return `${IMPORT_WITHDRAWAL_REQUEST} - ${msg}`
}

export enum ImportWithdrawalErrors {
  NOT_FOUND = 'notFound',
  NOT_WITHDRAWAL = 'notWithdrawal',
  NOT_OWN_TRANSACTION = 'notOwnTransaction',
  ALREADY_PROCESSED = 'alreadyProcessed'
}

export const importWithdrawalErrors = {
  notFound: formatImportWithdrawalError(ImportWithdrawalErrors.NOT_FOUND),
  notWithdrawal: formatImportWithdrawalError(ImportWithdrawalErrors.NOT_WITHDRAWAL),
  notOwnTransaction: formatImportWithdrawalError(ImportWithdrawalErrors.NOT_OWN_TRANSACTION),
  alreadyProcessed: formatImportWithdrawalError(ImportWithdrawalErrors.ALREADY_PROCESSED),
  other: (msg: string) => formatImportWithdrawalError(msg)
}

// TODO: Reimplement with viem public client for tx lookup
export function* handleImportWithdrawalRequest(action: ImportWithdrawalRequestAction) {
  const { payload } = action
  void payload // txHash will be used in viem implementation

  try {
    const address: string | undefined = yield select(getAddress)

    if (!address) {
      yield put(importWithdrawalFailure(importWithdrawalErrors.other('Could not get the address')))
      return
    }

    // TODO: Reimplement with viem public client
    throw new Error('Import withdrawal: Not yet implemented with viem')
  } catch (error: any) {
    yield put(importWithdrawalFailure(importWithdrawalErrors.other(error.message)))
  }
}

function* handleSetDepositStatus(action: SetDepositStatusAction) {
  const { status } = action.payload
  if (status === DepositStatus.COMPLETE) {
    yield put(fetchWalletRequest())
  }
}

function* handleSetWithdrawalStatus(action: SetWithdrawalStatusAction) {
  const { status } = action.payload
  if (status === WithdrawalStatus.COMPLETE) {
    yield put(fetchWalletRequest())
  }
}

function* handleFetchTransactionSuccess(action: FetchTransactionSuccessAction) {
  const { transaction } = action.payload
  if (transaction.actionType === TRANSFER_MANA_SUCCESS) {
    yield put(fetchWalletRequest())
  }
}
