import { call, select } from '@redux-saga/core/effects'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { expectSaga } from 'redux-saga-test-plan'
import { CreditsSettingsAPI, UserCreditsStatus, UserStatusResponse } from '../../lib/api/credits'
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
const mockAddress = '0x1234567890123456789012345678901234567890'

beforeEach(() => {
  creditsSettingsAPI = {
    getUserStatus: jest.fn(),
    optOut: jest.fn()
  } as unknown as CreditsSettingsAPI
})

describe('when handling the request action to get user credits status', () => {
  describe('and the user is not connected', () => {
    it('should put a get user credits status failure action', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([[select(getAddress), undefined]])
        .put(getUserCreditsStatusFailure('User is not connected'))
        .dispatch(getUserCreditsStatusRequest())
        .silentRun()
    })
  })

  describe('and the API call is successful', () => {
    describe('and the user is enrolled', () => {
      const response: UserStatusResponse = {
        status: UserCreditsStatus.ENROLLED,
        optedOutAt: null
      }

      it('should put a get user credits status success action with the status', () => {
        return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
          .provide([
            [select(getAddress), mockAddress],
            [call([creditsSettingsAPI, 'getUserStatus'], mockAddress), Promise.resolve(response)]
          ])
          .put(getUserCreditsStatusSuccess(UserCreditsStatus.ENROLLED, null))
          .dispatch(getUserCreditsStatusRequest())
          .silentRun()
      })
    })

    describe('and the user is opted out', () => {
      const optedOutAt = '2025-01-15T10:00:00.000Z'
      const response: UserStatusResponse = {
        status: UserCreditsStatus.OPTED_OUT,
        optedOutAt
      }

      it('should put a get user credits status success action with the status and optedOutAt', () => {
        return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
          .provide([
            [select(getAddress), mockAddress],
            [call([creditsSettingsAPI, 'getUserStatus'], mockAddress), Promise.resolve(response)]
          ])
          .put(getUserCreditsStatusSuccess(UserCreditsStatus.OPTED_OUT, optedOutAt))
          .dispatch(getUserCreditsStatusRequest())
          .silentRun()
      })
    })

    describe('and the user is not registered', () => {
      const response: UserStatusResponse = {
        status: UserCreditsStatus.NOT_REGISTERED,
        optedOutAt: null
      }

      it('should put a get user credits status success action with not_registered status', () => {
        return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
          .provide([
            [select(getAddress), mockAddress],
            [call([creditsSettingsAPI, 'getUserStatus'], mockAddress), Promise.resolve(response)]
          ])
          .put(getUserCreditsStatusSuccess(UserCreditsStatus.NOT_REGISTERED, null))
          .dispatch(getUserCreditsStatusRequest())
          .silentRun()
      })
    })
  })

  describe('and the API call fails', () => {
    const errorMessage = 'Failed to get user status'

    it('should put a get user credits status failure action with the error', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([
          [select(getAddress), mockAddress],
          [call([creditsSettingsAPI, 'getUserStatus'], mockAddress), Promise.reject(new Error(errorMessage))]
        ])
        .put(getUserCreditsStatusFailure(errorMessage))
        .dispatch(getUserCreditsStatusRequest())
        .silentRun()
    })
  })
})

describe('when handling the request action to opt out from credits', () => {
  describe('and the user is not connected', () => {
    it('should put an opt out failure action', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([[select(getAddress), undefined]])
        .put(optOutFromCreditsFailure('User is not connected'))
        .dispatch(optOutFromCreditsRequest())
        .silentRun()
    })
  })

  describe('and the API call is successful', () => {
    it('should put an opt out success action and close modal', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([
          [select(getAddress), mockAddress],
          [call([creditsSettingsAPI, 'optOut'], mockAddress), Promise.resolve()]
        ])
        .put(optOutFromCreditsSuccess())
        .put(closeModal('OptOutConfirmationModal'))
        .dispatch(optOutFromCreditsRequest())
        .silentRun()
    })
  })

  describe('and the API call fails', () => {
    const errorMessage = 'You cannot opt out this week because you have already claimed credits'

    it('should put an opt out failure action with the error', () => {
      return expectSaga(creditsSettingsSagas, creditsSettingsAPI)
        .provide([
          [select(getAddress), mockAddress],
          [call([creditsSettingsAPI, 'optOut'], mockAddress), Promise.reject(new Error(errorMessage))]
        ])
        .put(optOutFromCreditsFailure(errorMessage))
        .dispatch(optOutFromCreditsRequest())
        .silentRun()
    })
  })
})
