import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { createManaFiatGatewaysSaga } from 'decentraland-dapps/dist/modules/manaFiatGateway/sagas'
import { TRANSACTIONS_API_URL } from './mana/utils'
import { modalSaga } from './modal/sagas'
import { locationSaga } from './location/sagas'
import { manaSaga } from './mana/sagas'
import { profileSaga as localProfileSaga } from './profile/sagas'
import { config } from '../config'
import * as translations from '../locales'
import { NetworkGatewayType } from 'decentraland-ui'

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

const manaFiatGatewaysSaga = createManaFiatGatewaysSaga({
  [NetworkGatewayType.MOON_PAY]: {
    apiBaseUrl: config.get('MOON_PAY_API_URL'),
    apiKey: config.get('MOON_PAY_API_KEY'),
    pollingDelay: +config.get('MOON_PAY_POLLING_DELAY'),
    widgetBaseUrl: config.get('MOON_PAY_WIDGET_URL'),
  },
  [NetworkGatewayType.TRANSAK]: {
    key: config.get('TRANSAK_KEY'),
    env: config.get('TRANSAK_ENV'),
  },
})

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    transactionSaga(),
    profileSaga(),
    walletSaga(),
    translationSaga(),
    modalSaga(),
    locationSaga(),
    manaSaga(),
    toastSaga(),
    manaFiatGatewaysSaga(),
    localProfileSaga(),
  ])
}
