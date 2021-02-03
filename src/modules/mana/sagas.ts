import { CONNECT_WALLET_SUCCESS } from 'decentraland-dapps/dist/modules/wallet/actions'
import { createEth } from 'decentraland-dapps/dist/lib/eth'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { coingecko } from '../../lib/api/coingecko'
import {
  fetchManaPriceFailure,
  fetchManaPriceRequest,
  FetchManaPriceRequestAction,
  fetchManaPriceSuccess,
  FETCH_MANA_PRICE_REQUEST,
  sendManaFailure,
  SendManaRequestAction,
  sendManaSuccess,
  SEND_MANA_REQUEST
} from './actions'
import { Eth } from 'web3x-es/eth'
import { ERC20 } from '../../contracts/ERC20'
import { Address } from 'web3x-es/address'
import { MANA_CONTRACT_ADDRESS } from './utils'
import { toWei } from 'web3x-es/utils'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'

export function* manaSaga() {
  yield takeEvery(SEND_MANA_REQUEST, handleSendManaRequest)
  yield takeEvery(FETCH_MANA_PRICE_REQUEST, handleFetchManaPriceRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
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
