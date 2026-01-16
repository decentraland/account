import { call } from '@redux-saga/core/effects'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { expectSaga } from 'redux-saga-test-plan'
import { CreditsSettingsAPI, UserStatusResponse } from '../../lib/api/credits'
import {
  getUserCreditsStatusFailure,
  getUserCreditsStatusRequest,
  getUserCreditsStatusSuccess,
  optOutFromCreditsFailure,
  optOutFromCreditsRequest,
  optOutFromCreditsSuccess
} from './actions'
import { creditsSettingsSagas } from './sagas'

let creditsSettingsAPI: CreditsSettingsAPI

beforeEach(() => {
  creditsSettingsAPI = {
    getUserStatus: jest.fn(),
    optOut: jest.fn()
  } as unknown as CreditsSettingsAPI
})

describe('when handling the request action to get user credits status', () => {
  describe('and the API call is successful', () => {
    describe('and the user is enrolled', () => {
      const response: UserStatusResponse = {
        status: 'enrolled',
        optedOutAt: null
      }

      it('should put a get user credits status success action with the status', () => {
        return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
          .provide([[call([creditsSettingsAPI, 'getUserStatus']), Promise.resolve(response)]])
          .put(getUserCreditsStatusSuccess('enrolled', null))
          .dispatch(getUserCreditsStatusRequest())
          .silentRun()
      })
    })

    describe('and the user is opted out', () => {
      const optedOutAt = '2025-01-15T10:00:00.000Z'
      const response: UserStatusResponse = {
        status: 'opted_out',
        optedOutAt
      }

      it('should put a get user credits status success action with the status and optedOutAt', () => {
        return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
          .provide([[call([creditsSettingsAPI, 'getUserStatus']), Promise.resolve(response)]])
          .put(getUserCreditsStatusSuccess('opted_out', optedOutAt))
          .dispatch(getUserCreditsStatusRequest())
          .silentRun()
      })
    })

    describe('and the user is never registered', () => {
      const response: UserStatusResponse = {
        status: 'never_registered',
        optedOutAt: null
      }

      it('should put a get user credits status success action with never_registered status', () => {
        return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
          .provide([[call([creditsSettingsAPI, 'getUserStatus']), Promise.resolve(response)]])
          .put(getUserCreditsStatusSuccess('never_registered', null))
          .dispatch(getUserCreditsStatusRequest())
          .silentRun()
      })
    })
  })

  describe('and the API call fails', () => {
    const errorMessage = 'Failed to get user status'

    it('should put a get user credits status failure action with the error', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([[call([creditsSettingsAPI, 'getUserStatus']), Promise.reject(new Error(errorMessage))]])
        .put(getUserCreditsStatusFailure(errorMessage))
        .dispatch(getUserCreditsStatusRequest())
        .silentRun()
    })
  })
})

describe('when handling the request action to opt out from credits', () => {
  describe('and the API call is successful', () => {
    const statusResponse: UserStatusResponse = {
      status: 'opted_out',
      optedOutAt: '2025-01-15T10:00:00.000Z'
    }

    it('should put an opt out success action, close modal, and refresh status', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([
          [call([creditsSettingsAPI, 'optOut']), Promise.resolve()],
          [call([creditsSettingsAPI, 'getUserStatus']), Promise.resolve(statusResponse)]
        ])
        .put(optOutFromCreditsSuccess())
        .put(closeModal('OptOutConfirmationModal'))
        .put(getUserCreditsStatusRequest())
        .dispatch(optOutFromCreditsRequest())
        .silentRun()
    })
  })

  describe('and the API call fails', () => {
    const errorMessage = 'You cannot opt out this week because you have already claimed credits'

    it('should put an opt out failure action with the error', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([[call([creditsSettingsAPI, 'optOut']), Promise.reject(new Error(errorMessage))]])
        .put(optOutFromCreditsFailure(errorMessage))
        .dispatch(optOutFromCreditsRequest())
        .silentRun()
    })
  })
})
