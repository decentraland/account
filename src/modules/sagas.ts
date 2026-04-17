import { all } from 'redux-saga/effects'
import { CreditsSettingsAPI } from '../lib/api/credits'
import { NotificationsAPI } from '../lib/notifications/NotificationsAPI'
import { creditsSettingsSagas } from './creditsSettings/sagas'
import { locationSaga as localLocationSaga } from './location/sagas'
import { manaSaga } from './mana/sagas'
import { modalSaga } from './modal/sagas'
import { subscriptionSagas } from './subscription/sagas'

export function* rootSaga(notificationsAPI: NotificationsAPI, creditsSettingsAPI: CreditsSettingsAPI) {
  yield all([creditsSettingsSagas(creditsSettingsAPI), modalSaga(), localLocationSaga(), manaSaga(), subscriptionSagas(notificationsAPI)])
}
