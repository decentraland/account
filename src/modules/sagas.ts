import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { authorizationSaga } from 'decentraland-dapps/dist/modules/authorization/sagas'
import { CreditsClient } from 'decentraland-dapps/dist/modules/credits/CreditsClient'
import { creditsSaga } from 'decentraland-dapps/dist/modules/credits/sagas'
import { featuresSaga } from 'decentraland-dapps/dist/modules/features/sagas'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { createGatewaySaga } from 'decentraland-dapps/dist/modules/gateway/sagas'
import { FiatGateway } from 'decentraland-dapps/dist/modules/gateway/types'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import { all } from 'redux-saga/effects'
import { NetworkGatewayType } from 'decentraland-ui'
import { config } from '../config'
import * as translations from '../locales'
import { locationSaga as localLocationSaga } from './location/sagas'
import { manaSaga } from './mana/sagas'
import { TRANSACTIONS_API_URL } from './mana/utils'
import { modalSaga } from './modal/sagas'
import { subscriptionSagas } from './subscription/sagas'

const analyticsSaga = createAnalyticsSaga()

const profileSaga = createProfileSaga({
  peerUrl: config.get('PEER_URL'),
  getIdentity: () => undefined
})

const translationSaga = createTranslationSaga({
  translations: translations as any
})

const walletSaga = createWalletSaga({
  CHAIN_ID: +(config.get('CHAIN_ID') || 1),
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL
})

const gatewaySaga = createGatewaySaga({
  [NetworkGatewayType.MOON_PAY]: {
    apiBaseUrl: config.get('MOON_PAY_API_URL'),
    apiKey: config.get('MOON_PAY_API_KEY'),
    pollingDelay: +config.get('MOON_PAY_POLLING_DELAY'),
    widgetBaseUrl: config.get('MOON_PAY_WIDGET_URL')
  },
  [NetworkGatewayType.TRANSAK]: {
    apiBaseUrl: config.get('TRANSAK_API_URL'),
    key: config.get('TRANSAK_KEY'),
    env: config.get('TRANSAK_ENV'),
    pollingDelay: +config.get('TRANSAK_POLLING_DELAY'),
    pusher: {
      appKey: config.get('TRANSAK_PUSHER_APP_KEY'),
      appCluster: config.get('TRANSAK_PUSHER_APP_CLUSTER')
    }
  },
  // Wert is not being used in account dapp
  [FiatGateway.WERT]: {
    marketplaceServerURL: '',
    url: ''
  }
})

export function* rootSaga(notificationsAPI: NotificationsAPI, creditsClient: CreditsClient) {
  yield all([
    analyticsSaga(),
    authorizationSaga(),
    transactionSaga(),
    creditsSaga({ creditsClient }),
    profileSaga(),
    walletSaga(),
    translationSaga(),
    modalSaga(),
    localLocationSaga(),
    featuresSaga({
      polling: {
        apps: [ApplicationName.DAPPS, ApplicationName.EXPLORER], // TODO: remove explorer once credits is released
        delay: 60000 /** 60 seconds */
      }
    }),
    manaSaga(),
    toastSaga(),
    subscriptionSagas(notificationsAPI),
    gatewaySaga()
  ])
}
