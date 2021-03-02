import { ethers } from 'ethers'
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
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { getConnectedProvider } from 'decentraland-dapps/dist/lib/eth'
import { getChainConfiguration } from 'decentraland-dapps/dist/lib/chainConfiguration'
import {
  getAddress,
  getChainId,
} from 'decentraland-dapps/dist/modules/wallet/selectors'
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
  // getProof,
} from './utils'
import { WithdrawalStatus, Withdrawal, Deposit, DepositStatus } from './types'
import { getWalletDeposits, getWalletWithdrawals } from './selectors'

export function* manaSaga() {
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
  yield takeEvery(SEND_MANA_REQUEST, handleSendManaRequest)
  yield takeEvery(FETCH_MANA_PRICE_REQUEST, handleFetchManaPriceRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleDepositManaRequest(action: DepositManaRequestAction) {
  const { amount } = action.payload

  try {
    const provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)
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
    const chainId: ChainId = yield select(getChainId)
    yield put(depositManaSuccess(amount, chainId, txHash))
    yield put(watchDepositStatusRequest(amount, txHash))
  } catch (error) {
    yield put(depositManaFailure(amount, error))
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
  yield call(() => waitForSync(deposit.hash, isDepositSynced))
  yield put(setDepositStatus(deposit.hash, DepositStatus.COMPLETE))
}

function* handleGetApprovedManaRequest(_action: GetApprovedManaRequestAction) {
  try {
    const provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)
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
    const provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)
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

    const chainId: ChainId = yield select(getChainId)
    yield put(approveManaSuccess(allowance, from.toString(), chainId, txHash))
  } catch (error) {
    yield put(closeModal('ConvertToMaticManaModal'))
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
      hash: txHash,
      from: address,
      status: WithdrawalStatus.PENDING,
      amount,
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
  yield call(() => waitForSync(tx.hash, isWithdrawalSynced))
  yield put(setWithdrawalStatus(tx.hash, WithdrawalStatus.CHECKPOINT))
}

function* handleInitiateWithdrawalRequest(
  action: InitiateWithdrawalRequestAction
) {
  const { amount } = action.payload

  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://rpc-mumbai.matic.today'
    )

    const manaConfig = getContract(ContractName.MANAToken, ChainId.MATIC_MUMBAI)
    const manaContract = new ethers.Contract(
      manaConfig.address,
      manaConfig.abi,
      provider
    )

    const txHash = yield call(async () => {
      const tx = await manaContract.populateTransaction.withdraw(
        toWei(amount.toString(), 'ether')
      )
      return sendMetaTransaction(
        new ethers.providers.Web3Provider(window.ethereum as any),
        provider,
        tx.data!,
        manaConfig
      )
    })

    const chainId: ChainId = yield select(getChainId)
    const config = getChainConfiguration(chainId)
    yield put(
      initiateWithdrawalSuccess(
        amount,
        config.networkMapping[Network.MATIC],
        txHash
      )
    )
    yield put(watchWithdrawalStatusRequest(amount, txHash))
  } catch (error) {
    yield put(initiateWithdrawalFailure(amount, error.message))
  }
}

function* handleFinishWithdrawalRequest(action: FinishWithdrawalRequestAction) {
  const { withdrawal } = action.payload
  try {
    const provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
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

    const matic = new MaticPOSClient({
      parentProvider: parentConfig.rpcURL,
      maticProvider: maticConfig.rpcURL,
      posRootChainManager: ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS,
      posERC20Predicate: ERC20_PREDICATE_CONTRACT_ADDRESS,
      parentDefaultOptions: { from },
      maticDefaultOptions: { from },
    })

    const data = yield call(() =>
      matic.exitERC20(withdrawal.hash, { from, encodeAbi: true })
    )

    const eth = new Eth(provider)

    const rootChainContract = new RootChainManager(
      eth,
      Address.fromString(ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS)
    )

    const txHash: string = yield call(() =>
      rootChainContract.methods
        .exit(data)
        .send({ from: Address.fromString(from) })
        .getTxHash()
    )

    yield put(finishWithdrawalSuccess(withdrawal, chainId, txHash))
  } catch (error) {
    yield put(finishWithdrawalFailure(withdrawal, error.message))
  }
}

function* handleSendManaRequest(action: SendManaRequestAction) {
  const { to, amount } = action.payload
  try {
    const provider = yield call(getConnectedProvider)
    if (!provider) {
      throw new Error(`Could not get connected provider`)
    }
    const eth = new Eth(provider)

    const address = yield select(getAddress)

    const mana = new ERC20(eth, Address.fromString(MANA_CONTRACT_ADDRESS))

    const txHash = yield call(() =>
      mana.methods
        .transfer(Address.fromString(to), toWei(amount.toString(), 'ether'))
        .send({ from: Address.fromString(address) })
        .getTxHash()
    )

    yield put(closeModal('SendManaModal'))
    const chainId: ChainId = yield select(getChainId)
    yield put(sendManaSuccess(to, amount, chainId, txHash))
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
        watchWithdrawalStatusRequest(withdrawal.amount, withdrawal.hash)
      )
    }
  }
}
