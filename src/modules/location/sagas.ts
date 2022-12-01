import { takeEvery, put, select } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccessAction,
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { manaFiatGatewayPurchaseCompleted } from 'decentraland-dapps/dist/modules/manaFiatGateway/actions'
import {
  push,
  getLocation,
  LOCATION_CHANGE,
  LocationChangeAction,
} from 'connected-react-router'
import { locations } from '../locations'
import { Network } from '@dcl/schemas'
import { NetworkGatewayType } from 'decentraland-ui'

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeEvery(LOCATION_CHANGE, handleLocationChange)
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  const location: ReturnType<typeof getLocation> = yield select(getLocation)
  if (location.pathname === locations.signIn()) {
    yield put(push(locations.root()))
  }
}

type RedirectTransactionQuery = {
  network?: Network
  gateway?: NetworkGatewayType
  transactionId?: string
  transactionStatus?: string
}
function* handleLocationChange(_action: LocationChangeAction) {
  const { query }: ReturnType<typeof getLocation> = yield select(getLocation)
  const { network, gateway, transactionId, transactionStatus } =
    query as RedirectTransactionQuery
  if (transactionId && transactionStatus && network && gateway) {
    yield put(
      manaFiatGatewayPurchaseCompleted(
        network,
        gateway,
        transactionId,
        transactionStatus
      )
    )
  }
}
