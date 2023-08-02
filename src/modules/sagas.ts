import { all } from 'redux-saga/effects'
import { NetworkGatewayType } from 'decentraland-ui'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import { featuresSaga } from 'decentraland-dapps/dist/modules/features/sagas'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { locationSaga } from 'decentraland-dapps/dist/modules/location/sagas'
import { createGatewaySaga } from 'decentraland-dapps/dist/modules/gateway/sagas'
import { authorizationSaga } from 'decentraland-dapps/dist/modules/authorization/sagas'
import { TRANSACTIONS_API_URL } from './mana/utils'
import { modalSaga } from './modal/sagas'
import { locationSaga as localLocationSaga } from './location/sagas'
import { manaSaga } from './mana/sagas'
import { profileSaga as localProfileSaga } from './profile/sagas'
import { config } from '../config'
import * as translations from '../locales'

const analyticsSaga = createAnalyticsSaga()

const profileSaga = createProfileSaga({
  peerUrl: config.get('PEER_URL')!,
})

const translationSaga = createTranslationSaga({ translations })

const walletSaga = createWalletSaga({
  CHAIN_ID: +(config.get('CHAIN_ID') || 1),
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL,
})

const gatewaySaga = createGatewaySaga({
  [NetworkGatewayType.MOON_PAY]: {
    apiBaseUrl: config.get('MOON_PAY_API_URL'),
    apiKey: config.get('MOON_PAY_API_KEY'),
    pollingDelay: +config.get('MOON_PAY_POLLING_DELAY'),
    widgetBaseUrl: config.get('MOON_PAY_WIDGET_URL'),
  },
  [NetworkGatewayType.TRANSAK]: {
    apiBaseUrl: config.get('TRANSAK_API_URL'),
    key: config.get('TRANSAK_KEY'),
    env: config.get('TRANSAK_ENV'),
    pollingDelay: +config.get('TRANSAK_POLLING_DELAY'),
    pusher: {
      appKey: config.get('TRANSAK_PUSHER_APP_KEY'),
      appCluster: config.get('TRANSAK_PUSHER_APP_CLUSTER'),
    },
  },
})

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    authorizationSaga(),
    transactionSaga(),
    profileSaga(),
    walletSaga(),
    translationSaga(),
    modalSaga(),
    locationSaga(),
    localLocationSaga(),
    featuresSaga({
      polling: {
        apps: [ApplicationName.DAPPS],
        delay: 60000 /** 60 seconds */,
      },
    }),
    manaSaga(),
    toastSaga(),
    gatewaySaga(),
    localProfileSaga(),
  ])
}
