import { ChainId, Network } from '@dcl/schemas'
import { ITransactionWriteResult, POSClient, setProofApi, use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { getChainIdByNetwork, getConnectedProvider, getNetworkProvider, getSigner } from 'decentraland-dapps/dist/lib/eth'
import { closeModal, openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import {
  FETCH_TRANSACTION_SUCCESS,
  FetchTransactionSuccessAction,
  fetchTransactionRequest
} from 'decentraland-dapps/dist/modules/transaction/actions'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction, fetchWalletRequest } from 'decentraland-dapps/dist/modules/wallet/actions'
import { getAddress, getChainId, getNetworks } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { Provider } from 'decentraland-dapps/dist/modules/wallet/types'
import { sendTransaction } from 'decentraland-dapps/dist/modules/wallet/utils'
import { Signer, ethers } from 'ethers'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { ContractName, getContract } from 'decentraland-transactions'
import { ERC20__factory, RootChainManager__factory } from '../../contracts'
import { coingecko } from '../../lib/api/coingecko'
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
  approveManaSuccess,
  depositManaFailure,
  depositManaSuccess,
  fetchManaPriceFailure,
  fetchManaPriceRequest,
  fetchManaPriceSuccess,
  finishWithdrawalFailure,
  finishWithdrawalSuccess,
  getApprovedManaFailure,
  getApprovedManaRequest,
  getApprovedManaSuccess,
  importWithdrawalFailure,
  importWithdrawalSuccess,
  initiateWithdrawalFailure,
  initiateWithdrawalSuccess,
  setDepositStatus,
  setWithdrawalFinalizeHash,
  setWithdrawalStatus,
  transferManaFailure,
  transferManaSuccess,
  watchDepositStatusFailure,
  watchDepositStatusRequest,
  watchDepositStatusSuccess,
  watchWithdrawalStatusFailure,
  watchWithdrawalStatusRequest,
  watchWithdrawalStatusSuccess
} from './actions'
import { getWalletDeposits, getWalletWithdrawals } from './selectors'
import { Deposit, DepositStatus, TransferStatus, Withdrawal, WithdrawalStatus } from './types'
import {
  ERC20_PREDICATE_CONTRACT_ADDRESS,
  MANA_CONTRACT_ADDRESS,
  ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS,
  getMaticPOSClient,
  getStoreWithdrawalByHash,
  isDepositSynced,
  isWithdrawalSynced,
  waitForSync
} from './utils'

// Makes the maticjs client use the ethers library.
use(Web3ClientPlugin)

// Required for doing withdrawExitFaster calls with the maticjs client.
setProofApi('https://proof-generator.polygon.technology/')

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

function* handleDepositManaRequest(action: DepositManaRequestAction) {
  const { amount } = action.payload

  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error('Could not get connected provider')
    }
    const signer: Signer = yield getSigner()
    const from: string = yield select(getAddress)
    const rootChainContract = RootChainManager__factory.connect(ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS, signer)
    const transaction: ethers.ContractTransaction = yield call(() =>
      rootChainContract.depositFor(
        from,
        MANA_CONTRACT_ADDRESS,
        ethers.utils.defaultAbiCoder.encode(['uint256'], [ethers.utils.parseEther(amount.toString())])
      )
    )

    const txHash = transaction.hash
    const chainId: ChainId = yield select(getChainId)
    yield put(depositManaSuccess(amount, chainId, txHash))
    yield put(watchDepositStatusRequest(amount, txHash))
    yield put(closeModal('ConvertManaModal'))
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
  const networks: ReturnType<typeof getNetworks> = yield select(getNetworks)
  const ethereumProvider: Provider = yield call(() => getNetworkProvider(networks![Network.ETHEREUM].chainId))
  const maticProvider: Provider = yield call(() => getNetworkProvider(networks![Network.MATIC].chainId))
  yield call(() => {
    return waitForSync(deposit.hash, txHash => isDepositSynced(txHash, ethereumProvider, maticProvider))
  })
  yield put(setDepositStatus(deposit.hash, DepositStatus.COMPLETE))
}

function* handleGetApprovedManaRequest(_action: GetApprovedManaRequestAction) {
  try {
    const chainId = getChainIdByNetwork(Network.ETHEREUM)
    const provider: Provider = yield call(getNetworkProvider, chainId)
    if (!provider) {
      throw new Error('Could not connect to provider')
    }
    const signer: Signer = yield getSigner()
    const from: string = yield select(getAddress)
    const manaContract = ERC20__factory.connect(MANA_CONTRACT_ADDRESS, signer)

    const allowance: ethers.BigNumber = yield call(() => manaContract.allowance(from, ERC20_PREDICATE_CONTRACT_ADDRESS))
    yield put(getApprovedManaSuccess(allowance.toString()))
  } catch (error: any) {
    yield put(getApprovedManaFailure(error.message))
  }
}

function* handleApproveManaRequest(action: ApproveManaRequestAction) {
  const { allowance } = action.payload
  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error('Could not connect to provider')
    }
    const signer: Signer = yield getSigner()
    const from: string = yield select(getAddress)
    const manaContract = ERC20__factory.connect(MANA_CONTRACT_ADDRESS, signer)

    const transaction: ethers.ContractTransaction = yield call(() => manaContract.approve(ERC20_PREDICATE_CONTRACT_ADDRESS, allowance))

    const chainId: ChainId = yield select(getChainId)
    yield put(approveManaSuccess(allowance, from.toString(), chainId, transaction.hash))
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

function* handleWatchWithdrawalStatusSuccess(action: WatchWithdrawalStatusSuccessAction) {
  const { withdrawal: tx } = action.payload
  const networks: ReturnType<typeof getNetworks> = yield select(getNetworks)
  const maticProvider: Provider = yield call(() => getNetworkProvider(networks![Network.MATIC].chainId))
  yield call(() => {
    return waitForSync(tx.initializeHash, txHash => isWithdrawalSynced(txHash, maticProvider))
  })
  yield put(setWithdrawalStatus(tx.initializeHash, WithdrawalStatus.CHECKPOINT))
}

function* handleInitiateWithdrawalRequest(action: InitiateWithdrawalRequestAction) {
  const { amount } = action.payload

  try {
    const chainId = getChainIdByNetwork(Network.MATIC)
    const contract = getContract(ContractName.MANAToken, chainId)
    const txHash: string = yield call(sendTransaction, contract, mana => mana.withdraw(ethers.utils.parseEther(amount.toString())))
    yield put(initiateWithdrawalSuccess(amount, chainId, txHash))
    yield put(watchWithdrawalStatusRequest(amount, txHash))
    yield put(openModal('WithdrawalStatusModal', { txHash }))
    yield put(closeModal('ConvertManaModal'))
  } catch (error: any) {
    yield put(initiateWithdrawalFailure(amount, error.message))
  }
}

function* handleFinishWithdrawalRequest(action: FinishWithdrawalRequestAction) {
  const { withdrawal } = action.payload

  try {
    const from: string | undefined = yield select(getAddress)
    if (!from) {
      throw new Error('Could not get address')
    }

    const chainId: ChainId = yield select(getChainId)
    const matic: POSClient = yield call(getMaticPOSClient)
    const erc20RootToken = matic.erc20(MANA_CONTRACT_ADDRESS, true)

    const withdrawExitResult: ITransactionWriteResult = yield call(
      [erc20RootToken, erc20RootToken.withdrawExitFaster],
      withdrawal.initializeHash,
      { from }
    )

    const transactionHash: string = yield call([withdrawExitResult, withdrawExitResult.getTransactionHash])

    yield put(setWithdrawalFinalizeHash(withdrawal, transactionHash))

    const storeWithdrawal: Withdrawal = yield getStoreWithdrawalByHash(withdrawal.initializeHash)

    yield put(finishWithdrawalSuccess(storeWithdrawal, chainId, transactionHash))
  } catch (error: any) {
    const storeWithdrawal: Withdrawal = yield getStoreWithdrawalByHash(withdrawal.initializeHash)

    yield put(finishWithdrawalFailure(storeWithdrawal, error.message))
  }
}

function* handleSendManaRequest(action: TransferManaRequestAction) {
  const { to, amount, network } = action.payload
  try {
    const provider: Provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error('Could not get connected provider')
    }
    const signer: Signer = yield getSigner()
    const mana = ERC20__factory.connect(MANA_CONTRACT_ADDRESS, signer)

    switch (network) {
      case Network.ETHEREUM: {
        const { hash }: ethers.ContractTransaction = yield call(() => mana.transfer(to, ethers.utils.parseEther(amount.toString())))
        const chainId: ChainId = yield select(getChainId)

        yield put(
          transferManaSuccess(
            {
              hash,
              network,
              chainId,
              amount,
              to,
              status: TransferStatus.CONFIRMED,
              timestamp: Date.now()
            },
            chainId,
            hash
          )
        )
        break
      }
      case Network.MATIC: {
        const chainId = getChainIdByNetwork(network)
        const contract = getContract(ContractName.MANAToken, chainId)
        const txHash: string = yield call(sendTransaction, contract, mana => mana.transfer(to, ethers.utils.parseEther(amount.toString())))

        yield put(
          transferManaSuccess(
            {
              hash: txHash,
              network,
              chainId,
              amount,
              to,
              status: TransferStatus.CONFIRMED,
              timestamp: Date.now()
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

export function* handleImportWithdrawalRequest(action: ImportWithdrawalRequestAction) {
  const {
    payload: { txHash }
  } = action

  try {
    const address: string | undefined = yield select(getAddress)

    if (!address) {
      yield put(importWithdrawalFailure(importWithdrawalErrors.other('Could not get the address')))
      return
    }

    const chainId: ChainId = yield call(getChainIdByNetwork, Network.MATIC)
    const provider: Provider = yield call(getNetworkProvider, chainId)

    const transaction: { input: string; from: string } | undefined = yield call([provider, 'send'], 'eth_getTransactionByHash', [txHash])

    if (!transaction) {
      yield put(importWithdrawalFailure(importWithdrawalErrors.notFound))
      return
    }

    const { input, from } = transaction

    // hex for the "withdraw" method found in transaction.input
    const method = '2e1a7d4d'
    const methodIndex = input.indexOf(method)

    if (methodIndex === -1) {
      yield put(importWithdrawalFailure(importWithdrawalErrors.notWithdrawal))
      return
    }

    if (from !== address && !input.includes(address.slice(2))) {
      yield put(importWithdrawalFailure(importWithdrawalErrors.notOwnTransaction))
      return
    }

    const matic: POSClient = yield call(getMaticPOSClient)
    const erc20RootToken = matic.erc20(MANA_CONTRACT_ADDRESS, true)

    let isProcessed: boolean

    try {
      isProcessed = yield call([erc20RootToken, erc20RootToken.isWithdrawExited], txHash)
    } catch (e) {
      isProcessed = false
    }

    if (isProcessed) {
      yield put(importWithdrawalFailure(importWithdrawalErrors.alreadyProcessed))
      return
    }

    const methodEndIndex = methodIndex + method.length
    const amountHex = '0x' + input.slice(methodEndIndex, methodEndIndex + 64)
    const amountDec = ethers.BigNumber.from(amountHex).div('1000000000000000000').toNumber()

    const withdrawal = {
      amount: amountDec,
      initializeHash: txHash,
      status: WithdrawalStatus.PENDING,
      finalizeHash: null,
      from: address,
      timestamp: Date.now()
    }

    yield put(importWithdrawalSuccess())
    yield put(fetchTransactionRequest(address, txHash, initiateWithdrawalSuccess(amountDec, chainId, txHash)))

    yield put(watchWithdrawalStatusSuccess(withdrawal))
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
