import { CONNECT_WALLET_SUCCESS } from 'decentraland-dapps/dist/modules/wallet/actions'
import { createEth } from 'decentraland-dapps/dist/lib/eth'
import { call, put, select, takeEvery } from 'redux-saga/effects'
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
} from './actions'
import { Eth } from 'web3x-es/eth'
import { ERC20 } from '../../contracts/ERC20'
import { Address } from 'web3x-es/address'
import {
  MANA_CONTRACT_ADDRESS,
  ERC20_PREDICATE,
  ROOT_CHAIN_MANAGER,
} from './utils'
import { toWei } from 'web3x-es/utils'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { RootChainManager } from '../../contracts/RootChainManager'

export function* manaSaga() {
  yield takeEvery(DEPOSIT_MANA_REQUEST, handleDepositMana)
  yield takeEvery(GET_APPROVED_MANA_REQUEST, handleGetApprovedMana)
  yield takeEvery(APPROVE_MANA_REQUEST, handleApproveManaRequest)
  yield takeEvery(SEND_MANA_REQUEST, handleSendManaRequest)
  yield takeEvery(FETCH_MANA_PRICE_REQUEST, handleFetchManaPriceRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleDepositMana(action: DepositManaRequestAction) {
  const { amount } = action.payload

  try {
    const eth: Eth | null = yield call(createEth)
    if (!eth) {
      throw new Error('Could not get Eth')
    }
    const from = yield select(getAddress)
    const rootChainContract = new RootChainManager(
      eth,
      Address.fromString(ROOT_CHAIN_MANAGER)
    )

    const txHash: string = yield call(() =>
      rootChainContract.methods
        .depositFor(
          Address.fromString(from),
          Address.fromString(MANA_CONTRACT_ADDRESS),
          toWei(amount.toString(), 'ether')
        )
        .send({ from: Address.fromString(from) })
        .getTxHash()
    )

    yield put(depositManaSuccess(amount, txHash))
  } catch (error) {
    yield put(depositManaFailure(amount, error))
  }
}

function* handleGetApprovedMana(_action: GetApprovedManaRequestAction) {
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
          Address.fromString(ERC20_PREDICATE)
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
        .approve(Address.fromString(ERC20_PREDICATE), allowance)
        .send({ from: Address.fromString(from) })
        .getTxHash()
    )

    yield put(approveManaSuccess(allowance, from.toString(), txHash))
  } catch (error) {
    yield put(approveManaFailure(allowance, error))
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

function* handleConnectWalletSuccess() {
  yield put(fetchManaPriceRequest())
}
