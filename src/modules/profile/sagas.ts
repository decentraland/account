import { put, takeLatest } from 'redux-saga/effects'
import { SET_PROFILE_AVATAR_DESCRIPTION_SUCCESS } from 'decentraland-dapps/dist/modules/profile/actions'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'

export function* profileSaga() {
  yield takeLatest(
    SET_PROFILE_AVATAR_DESCRIPTION_SUCCESS,
    handleProfileDescriptionSet
  )
}

function* handleProfileDescriptionSet() {
  yield put(closeModal('EditProfileAvatarDescriptionModal'))
}
