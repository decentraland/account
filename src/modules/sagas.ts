import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { walletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import * as translations from '../locales'

const analyticsSaga = createAnalyticsSaga()

const profileSaga = createProfileSaga({
  peerUrl: process.env.REACT_APP_PEER_URL!,
})

const translationSaga = createTranslationSaga({ translations })

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    transactionSaga(),
    profileSaga(),
    walletSaga(),
    translationSaga(),
  ])
}
