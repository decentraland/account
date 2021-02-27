import { ethers } from 'ethers'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Eth } from 'web3x-es/eth'
import { abiCoder } from 'web3x-es/contract/abi-coder'
import { Address } from 'web3x-es/address'
import { toWei } from 'web3x-es/utils'
import { ChainId } from '@dcl/schemas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { createEth } from 'decentraland-dapps/dist/lib/eth'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import {
  ContractName,
  getContract,
  sendMetaTransaction,
} from 'decentraland-transactions'
import { coingecko } from '../../lib/api/coingecko'
import {
  depositManaSuccess,
  depositManaFailure,
  DepositManaRequestAction,
  DEPOSIT_MANA_REQUEST,
  getApprovedManaSuccess,
  getApprovedManaFailure,
  GetApprovedManaRequestAction,
  GET_APPROVED_MANA_REQUEST,
  approveManaFailure,
  ApproveManaRequestAction,
  approveManaSuccess,
  APPROVE_MANA_REQUEST,
  fetchManaPriceFailure,
  fetchManaPriceRequest,
  FetchManaPriceRequestAction,
  fetchManaPriceSuccess,
  FETCH_MANA_PRICE_REQUEST,
  sendManaFailure,
  SendManaRequestAction,
  sendManaSuccess,
  SEND_MANA_REQUEST,
  withdrawManaFailure,
  WithdrawManaRequestAction,
  withdrawManaSuccess,
  WITHDRAW_MANA_REQUEST,
  setWithdrawTransactionStatus,
  WATCH_WITHDRAW_TRANSACTION_REQUEST,
  WatchWithdrawTransactionRequestAction,
  watchWithdrawTransactionRequest,
  WatchWithdrawTransactionSuccessAction,
  watchWithdrawTransactionSuccess,
  watchWithdrawTransactionFailure,
  WATCH_WITHDRAW_TRANSACTION_SUCCESS,
} from './actions'
import { ERC20 } from '../../contracts/ERC20'
import { RootChainManager } from '../../contracts/RootChainManager'
import {
  MANA_CONTRACT_ADDRESS,
  ERC20_PREDICATE_CONTRACT_ADDRESS,
  ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS,
  waitForSync,
  isWithdrawSynced,
} from './utils'
import { WithdrawStatus, WithdrawTransaction } from './types'
import { getWithdrawTransactions } from './selectors'

export function* manaSaga() {
  yield takeEvery(DEPOSIT_MANA_REQUEST, handleDepositManaRequest)
  yield takeEvery(GET_APPROVED_MANA_REQUEST, handleGetApprovedManaRequest)
  yield takeEvery(APPROVE_MANA_REQUEST, handleApproveManaRequest)
  yield takeEvery(
    WATCH_WITHDRAW_TRANSACTION_REQUEST,
    handleWatchWithdrawTransactionRequest
  )
  yield takeEvery(
    WATCH_WITHDRAW_TRANSACTION_SUCCESS,
    handleWatchWithdrawTransactionSuccess
  )
  yield takeEvery(WITHDRAW_MANA_REQUEST, handleWithdrawManaRequest)
  yield takeEvery(SEND_MANA_REQUEST, handleSendManaRequest)
  yield takeEvery(FETCH_MANA_PRICE_REQUEST, handleFetchManaPriceRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleDepositManaRequest(action: DepositManaRequestAction) {
  const { amount } = action.payload

  try {
    const eth: Eth | null = yield call(createEth)
    if (!eth) {
      throw new Error('Could not get Eth')
    }
    const from = yield select(getAddress)
    const rootChainContract = new RootChainManager(
      eth,
      Address.fromString(ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS)
    )

    const txHash: string = yield call(() =>
      rootChainContract.methods
        .depositFor(
          Address.fromString(from),
          Address.fromString(MANA_CONTRACT_ADDRESS),
          abiCoder.encodeParameter('uint256', toWei(amount.toString(), 'ether'))
        )
        .send({ from: Address.fromString(from) })
        .getTxHash()
    )

    yield put(closeModal('ConvertToMaticManaModal'))
    yield put(depositManaSuccess(amount, txHash))
  } catch (error) {
    yield put(depositManaFailure(amount, error))
  }
}

function* handleGetApprovedManaRequest(_action: GetApprovedManaRequestAction) {
  try {
    const eth: Eth | null = yield call(createEth)
    if (!eth) {
      throw new Error('Could not get Eth')
    }
    const from = yield select(getAddress)
    const manaContract = new ERC20(
      eth,
      Address.fromString(MANA_CONTRACT_ADDRESS)
    )

    const allowance: string = yield call(() =>
      manaContract.methods
        .allowance(
          Address.fromString(from),
          Address.fromString(ERC20_PREDICATE_CONTRACT_ADDRESS)
        )
        .call()
    )
    yield put(getApprovedManaSuccess(allowance))
  } catch (error) {
    yield put(getApprovedManaFailure(error))
  }
}

function* handleApproveManaRequest(action: ApproveManaRequestAction) {
  const { allowance } = action.payload
  try {
    const eth: Eth | null = yield call(createEth)
    if (!eth) {
      throw new Error('Could not get Eth')
    }
    const from = yield select(getAddress)
    const manaContract = new ERC20(
      eth,
      Address.fromString(MANA_CONTRACT_ADDRESS)
    )

    const txHash: string = yield call(() =>
      manaContract.methods
        .approve(
          Address.fromString(ERC20_PREDICATE_CONTRACT_ADDRESS),
          allowance
        )
        .send({ from: Address.fromString(from) })
        .getTxHash()
    )

    yield put(approveManaSuccess(allowance, from.toString(), txHash))
  } catch (error) {
    yield put(closeModal('ConvertToMaticManaModal'))
    yield put(approveManaFailure(allowance, error))
  }
}

function* handleWatchWithdrawTransactionRequest(
  action: WatchWithdrawTransactionRequestAction
) {
  const { txHash, amount } = action.payload
  const address: string | undefined = yield select(getAddress)
  if (address) {
    const tx: WithdrawTransaction = {
      hash: txHash,
      from: address,
      status: WithdrawStatus.PENDING,
      amount,
    }
    yield put(watchWithdrawTransactionSuccess(tx))
  } else {
    yield put(watchWithdrawTransactionFailure(txHash, 'Invalid address'))
  }
}

function* handleWatchWithdrawTransactionSuccess(
  action: WatchWithdrawTransactionSuccessAction
) {
  const { tx } = action.payload
  yield call(() => waitForSync(tx.hash, isWithdrawSynced))
  yield put(setWithdrawTransactionStatus(tx.hash, WithdrawStatus.CONFIRMED))
}

function* handleWithdrawManaRequest(action: WithdrawManaRequestAction) {
  const { amount } = action.payload

  try {
    // withdraw mana
    const provider = new ethers.providers.JsonRpcProvider(
      'https://rpc-mumbai.matic.today'
    )

    const manaConfig = getContract(ContractName.MANAToken, ChainId.MATIC_MUMBAI)
    const manaContract = new ethers.Contract(
      manaConfig.address,
      manaConfig.abi,
      provider
    )

    console.log(manaConfig)

    const txHash = yield call(async () => {
      const tx = await manaContract.populateTransaction.withdraw(
        toWei(amount.toString(), 'ether')
      )
      console.log('tx', tx)
      return sendMetaTransaction(
        new ethers.providers.Web3Provider(window.ethereum as any),
        provider,
        tx.data!,
        manaConfig
      )
    })

    yield put(withdrawManaSuccess(amount, txHash))
    yield put(watchWithdrawTransactionRequest(txHash, amount))
  } catch (error) {
    yield put(withdrawManaFailure(amount, error.message))
  }
}

function* handleSendManaRequest(action: SendManaRequestAction) {
  const { to, amount } = action.payload
  try {
    const eth: Eth | null = yield call(createEth)
    if (!eth) {
      throw new Error('Could not get Eth')
    }

    const address = yield select(getAddress)

    const mana = new ERC20(eth, Address.fromString(MANA_CONTRACT_ADDRESS))

    const txHash = yield call(() =>
      mana.methods
        .transfer(Address.fromString(to), toWei(amount.toString(), 'ether'))
        .send({ from: Address.fromString(address) })
        .getTxHash()
    )

    yield put(closeModal('SendManaModal'))
    yield put(sendManaSuccess(to, amount, txHash))
  } catch (error) {
    yield put(sendManaFailure(to, amount, error))
  }
}

function* handleFetchManaPriceRequest(_action: FetchManaPriceRequestAction) {
  try {
    const price = yield call(() => coingecko.fetchManaPrice())
    yield put(fetchManaPriceSuccess(price))
  } catch (error) {
    yield put(fetchManaPriceFailure(error))
  }
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield put(fetchManaPriceRequest())

  // watch pending withdraw txs
  const { address } = action.payload.wallet
  const withdrawTransactions: WithdrawTransaction[] = yield select(
    getWithdrawTransactions
  )
  for (const tx of withdrawTransactions) {
    if (tx.from === address && tx.status === WithdrawStatus.PENDING) {
      yield put(watchWithdrawTransactionRequest(tx.hash, tx.amount))
    }
  }
}
