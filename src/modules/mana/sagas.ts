import { call, put, select, takeEvery } from 'redux-saga/effects'
import { MaticPOSClient } from '@maticnetwork/maticjs'
import { Eth } from 'web3x-es/eth'
import { abiCoder } from 'web3x-es/contract/abi-coder'
import { Address } from 'web3x-es/address'
import { toWei } from 'web3x-es/utils'
import { ChainId, Network } from '@dcl/schemas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
  fetchWalletRequest,
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { Provider } from 'decentraland-dapps/dist/modules/wallet/types'
import { sendWalletTransaction } from 'decentraland-dapps/dist/modules/wallet/utils'
import {
  FetchTransactionSuccessAction,
  FETCH_TRANSACTION_SUCCESS,
} from 'decentraland-dapps/dist/modules/transaction/actions'
import {
  getNetworkProvider,
  getConnectedProvider,
  getChainIdByNetwork,
} from 'decentraland-dapps/dist/lib/eth'
import { getChainConfiguration } from 'decentraland-dapps/dist/lib/chainConfiguration'
import {
  getAddress,
  getChainId,
  getNetworks,
} from 'decentraland-dapps/dist/modules/wallet/selectors'
import { ContractName, getContract } from 'decentraland-transactions'
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
  transferManaFailure,
  transferManaSuccess,
  TransferManaRequestAction,
  TRANSFER_MANA_REQUEST,
  initiateWithdrawalFailure,
  InitiateWithdrawalRequestAction,
  initiateWithdrawalSuccess,
  INITIATE_WITHDRAWAL_REQUEST,
  setWithdrawalStatus,
  WATCH_WITHDRAWAL_STATUS_REQUEST,
  WatchWithdrawalStatusRequestAction,
  watchWithdrawalStatusRequest,
  WatchWithdrawalStatusSuccessAction,
  watchWithdrawalStatusSuccess,
  watchWithdrawalStatusFailure,
  WATCH_WITHDRAWAL_STATUS_SUCCESS,
  watchDepositStatusRequest,
  WatchDepositStatusRequestAction,
  WatchDepositStatusSuccessAction,
  watchDepositStatusSuccess,
  watchDepositStatusFailure,
  setDepositStatus,
  WATCH_DEPOSIT_STATUS_REQUEST,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  getApprovedManaRequest,
  FINISH_WITHDRAWAL_REQUEST,
  FinishWithdrawalRequestAction,
  finishWithdrawalFailure,
  finishWithdrawalSuccess,
  SET_DEPOSIT_STATUS,
  SetDepositStatusAction,
  SET_WITHDRAWAL_STATUS,
  SetWithdrawalStatusAction,
  TRANSFER_MANA_SUCCESS,
  setWithdrawalFinalizeHash,
} from './actions'
import { ERC20 } from '../../contracts/ERC20'
import { RootChainManager } from '../../contracts/RootChainManager'
import {
  MANA_CONTRACT_ADDRESS,
  ERC20_PREDICATE_CONTRACT_ADDRESS,
  ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS,
  waitForSync,
  isWithdrawalSynced,
  isDepositSynced,
  MATIC_ENV,
} from './utils'
import {
  WithdrawalStatus,
  Withdrawal,
  Deposit,
  DepositStatus,
  TransferStatus,
  MaticEnv,
} from './types'
import {
  getWalletDeposits,
  getWalletWithdrawals,
  getWithdrawals,
} from './selectors'
import { closeModal, openModal } from '../modal/actions'
import { store } from '../store'

export function* manaSaga() {
  yield takeEvery(SET_DEPOSIT_STATUS, handleSetDepositStatus)
  yield takeEvery(SET_WITHDRAWAL_STATUS, handleSetWithdrawalStatus)
  yield takeEvery(FETCH_TRANSACTION_SUCCESS, handleFetchTransactionSuccess)
  yield takeEvery(DEPOSIT_MANA_REQUEST, handleDepositManaRequest)
  yield takeEvery(GET_APPROVED_MANA_REQUEST, handleGetApprovedManaRequest)
  yield takeEvery(APPROVE_MANA_REQUEST, handleApproveManaRequest)
  yield takeEvery(WATCH_DEPOSIT_STATUS_REQUEST, handleWatchDepositStatusRequest)
  yield takeEvery(WATCH_DEPOSIT_STATUS_SUCCESS, handleWatchDepositStatusSuccess)
  yield takeEvery(
    WATCH_WITHDRAWAL_STATUS_REQUEST,
    handleWatchWithdrawalStatusRequest
  )
  yield takeEvery(
    WATCH_WITHDRAWAL_STATUS_SUCCESS,
    handleWatchWithdrawalStatusSuccess
  )
  yield takeEvery(INITIATE_WITHDRAWAL_REQUEST, handleInitiateWithdrawalRequest)
  yield takeEvery(FINISH_WITHDRAWAL_REQUEST, handleFinishWithdrawalRequest)
  yield takeEvery(TRANSFER_MANA_REQUEST, handleSendManaRequest)
  yield takeEvery(FETCH_MANA_PRICE_REQUEST, handleFetchManaPriceRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleDepositManaRequest(action: DepositManaRequestAction) {
  const { amount } = action.payload

  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)
    const from: string = yield select(getAddress)
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

    const chainId: ChainId = yield select(getChainId)
    yield put(depositManaSuccess(amount, chainId, txHash))
    yield put(watchDepositStatusRequest(amount, txHash))
    yield put(closeModal('ConvertManaModal'))
  } catch (error) {
    yield put(depositManaFailure(amount, error.message))
  }
}

function* handleWatchDepositStatusRequest(
  action: WatchDepositStatusRequestAction
) {
  const { amount, txHash } = action.payload
  const address: string | undefined = yield select(getAddress)
  if (address) {
    const deposit: Deposit = {
      hash: txHash,
      from: address,
      status: DepositStatus.PENDING,
      amount,
      timestamp: Date.now(),
    }
    yield put(watchDepositStatusSuccess(deposit))
  } else {
    yield put(watchDepositStatusFailure(amount, txHash, 'Invalid address'))
  }
}

function* handleWatchDepositStatusSuccess(
  action: WatchDepositStatusSuccessAction
) {
  const { deposit } = action.payload
  const networks: ReturnType<typeof getNetworks> = yield select(getNetworks)
  const ethereumProvider: Provider = yield call(() =>
    getNetworkProvider(networks![Network.ETHEREUM].chainId)
  )
  const maticProvider: Provider = yield call(() =>
    getNetworkProvider(networks![Network.MATIC].chainId)
  )
  yield call(() => {
    return waitForSync(deposit.hash, (txHash) =>
      isDepositSynced(txHash, ethereumProvider, maticProvider)
    )
  })
  yield put(setDepositStatus(deposit.hash, DepositStatus.COMPLETE))
}

function* handleGetApprovedManaRequest(_action: GetApprovedManaRequestAction) {
  try {
    const chainId = getChainIdByNetwork(Network.ETHEREUM)
    const provider: Provider = yield call(getNetworkProvider, chainId)
    if (!provider) {
      throw new Error(`Could not connect to provider`)
    }
    const eth = new Eth(provider)
    const from: string = yield select(getAddress)
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
    yield put(getApprovedManaFailure(error.message))
  }
}

function* handleApproveManaRequest(action: ApproveManaRequestAction) {
  const { allowance } = action.payload
  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not connect to provider`)
    }
    const eth = new Eth(provider)
    const from: string = yield select(getAddress)
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

    const chainId: ChainId = yield select(getChainId)
    yield put(approveManaSuccess(allowance, from.toString(), chainId, txHash))
  } catch (error) {
    yield put(closeModal('ConvertManaModal'))
    yield put(approveManaFailure(allowance, error))
  }
}

function* handleWatchWithdrawalStatusRequest(
  action: WatchWithdrawalStatusRequestAction
) {
  const { amount, txHash } = action.payload
  const address: string | undefined = yield select(getAddress)
  if (address) {
    const tx: Withdrawal = {
      initializeHash: txHash,
      finalizeHash: null,
      from: address,
      status: WithdrawalStatus.PENDING,
      amount,
      timestamp: Date.now(),
    }
    yield put(watchWithdrawalStatusSuccess(tx))
  } else {
    yield put(watchWithdrawalStatusFailure(amount, txHash, 'Invalid address'))
  }
}

function* handleWatchWithdrawalStatusSuccess(
  action: WatchWithdrawalStatusSuccessAction
) {
  const { withdrawal: tx } = action.payload
  const networks: ReturnType<typeof getNetworks> = yield select(getNetworks)
  const maticProvider: Provider = yield call(() =>
    getNetworkProvider(networks![Network.MATIC].chainId)
  )
  yield call(() => {
    return waitForSync(tx.initializeHash, (txHash) =>
      isWithdrawalSynced(txHash, maticProvider)
    )
  })
  yield put(setWithdrawalStatus(tx.initializeHash, WithdrawalStatus.CHECKPOINT))
}

function* handleInitiateWithdrawalRequest(
  action: InitiateWithdrawalRequestAction
) {
  const { amount } = action.payload

  try {
    const chainId = getChainIdByNetwork(Network.MATIC)
    const contract = getContract(ContractName.MANAToken, chainId)
    const txHash: string = yield call(() =>
      sendWalletTransaction(contract, (mana) =>
        mana.withdraw(toWei(amount.toString(), 'ether'))
      )
    )
    yield put(initiateWithdrawalSuccess(amount, chainId, txHash))
    yield put(watchWithdrawalStatusRequest(amount, txHash))
    yield put(openModal('WithdrawalStatusModal', { txHash }))
    yield put(closeModal('ConvertManaModal'))
  } catch (error) {
    yield put(initiateWithdrawalFailure(amount, error.message))
  }
}

function* handleFinishWithdrawalRequest(action: FinishWithdrawalRequestAction) {
  const { withdrawal } = action.payload

  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not connect to provider`)
    }

    const from: string | undefined = yield select(getAddress)
    if (!from) {
      throw new Error(`Could not get address`)
    }

    const chainId: ChainId = yield select(getChainId)
    const parentConfig = getChainConfiguration(chainId)
    const maticConfig = getChainConfiguration(
      parentConfig.networkMapping[Network.MATIC]
    )

    const config = {
      network: MATIC_ENV,
      version: MATIC_ENV === MaticEnv.MAINNET ? 'v1' : 'mumbai',
      parentProvider: provider,
      maticProvider: maticConfig.rpcURL,
      parentDefaultOptions: { from },
      maticDefaultOptions: { from },
    }

    const matic = new MaticPOSClient(config)

    const tx: { transactionHash: string } = yield call(() =>
      matic.exitERC20(withdrawal.initializeHash, {
        from,
        onTransactionHash: (hash: string) => {
          store.dispatch(setWithdrawalFinalizeHash(withdrawal, hash))
        },
      })
    )

    const storeWithdrawal: Withdrawal = yield getStoreWithdrawalByHash(
      withdrawal.initializeHash
    )

    yield put(
      finishWithdrawalSuccess(storeWithdrawal!, chainId, tx.transactionHash)
    )
  } catch (error) {
    const storeWithdrawal: Withdrawal = yield getStoreWithdrawalByHash(
      withdrawal.initializeHash
    )

    yield put(finishWithdrawalFailure(storeWithdrawal!, error.message))
  }
}

function* handleSendManaRequest(action: TransferManaRequestAction) {
  const { to, amount, network } = action.payload
  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)
    const address: string = yield select(getAddress)
    const mana = new ERC20(eth, Address.fromString(MANA_CONTRACT_ADDRESS))

    switch (network) {
      case Network.ETHEREUM: {
        const txHash: string = yield call(() =>
          mana.methods
            .transfer(Address.fromString(to), toWei(amount.toString(), 'ether'))
            .send({ from: Address.fromString(address) })
            .getTxHash()
        )
        const chainId: ChainId = yield select(getChainId)

        yield put(
          transferManaSuccess(
            {
              hash: txHash,
              network,
              chainId,
              amount,
              to,
              status: TransferStatus.CONFIRMED,
              timestamp: Date.now(),
            },
            chainId,
            txHash
          )
        )
        break
      }
      case Network.MATIC: {
        const chainId = getChainIdByNetwork(network)
        const contract = getContract(ContractName.MANAToken, chainId)
        const txHash: string = yield call(() =>
          sendWalletTransaction(contract, (mana) =>
            mana.transfer(to, toWei(amount.toString(), 'ether'))
          )
        )
        yield put(
          transferManaSuccess(
            {
              hash: txHash,
              network,
              chainId,
              amount,
              to,
              status: TransferStatus.CONFIRMED,
              timestamp: Date.now(),
            },
            chainId,
            txHash
          )
        )
        break
      }

      default:
        throw new Error(`Invalid network "${network}"`)
    }

    yield put(closeModal('TransferManaModal'))
  } catch (error) {
    yield put(transferManaFailure(to, amount, network, error.message))
  }
}

function* handleFetchManaPriceRequest(_action: FetchManaPriceRequestAction) {
  try {
    const price: number = yield call(() => coingecko.fetchManaPrice())
    yield put(fetchManaPriceSuccess(price))
  } catch (error) {
    yield put(fetchManaPriceFailure(error))
  }
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  yield put(fetchManaPriceRequest())
  yield put(getApprovedManaRequest())

  // watch pending deposits and withdrawals
  const deposits: Deposit[] = yield select(getWalletDeposits)
  for (const deposit of deposits) {
    if (deposit.status === DepositStatus.PENDING) {
      yield put(watchDepositStatusRequest(deposit.amount, deposit.hash))
    }
  }
  const withdrawals: Withdrawal[] = yield select(getWalletWithdrawals)
  for (const withdrawal of withdrawals) {
    if (withdrawal.status === WithdrawalStatus.PENDING) {
      yield put(
        watchWithdrawalStatusRequest(
          withdrawal.amount,
          withdrawal.initializeHash
        )
      )
    }
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

function* getStoreWithdrawalByHash(hash: string) {
  const withdrawals: Withdrawal[] = yield select(getWithdrawals)
  return withdrawals.find((w) => w.initializeHash === hash)
}
