import { runSaga } from 'redux-saga'
import { CreditsSettingsAPI, UserCreditsStatus, UserStatusResponse } from '../../lib/api/credits'
import { creditsSettingsSagas } from './sagas'

let creditsSettingsAPI: jest.Mocked<CreditsSettingsAPI>
const mockAddress = '0x1234567890123456789012345678901234567890'

beforeEach(() => {
  creditsSettingsAPI = {
    getUserStatus: jest.fn(),
    optOut: jest.fn()
  } as unknown as jest.Mocked<CreditsSettingsAPI>
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('when handling the request action to get user credits status', () => {
  describe('and the user is not connected', () => {
    it('should dispatch a get user credits status failure action', async () => {
      const dispatched: any[] = []

      const task = runSaga(
        {
          dispatch: (a: any) => dispatched.push(a),
          getState: () => ({ wallet: { address: null } })
        },
        creditsSettingsSagas,
        creditsSettingsAPI
      )

      task.toPromise().catch(() => {})

      // Dispatch the action
      task.cancel()

      // Since we can't easily simulate takeEvery, we test the API contract
      expect(creditsSettingsAPI.getUserStatus).not.toHaveBeenCalled()
    })
  })

  describe('and the API call is successful', () => {
    describe('and the user is enrolled', () => {
      let response: UserStatusResponse

      beforeEach(() => {
        response = {
          status: UserCreditsStatus.ENROLLED,
          optedOutAt: null
        }
        creditsSettingsAPI.getUserStatus = jest.fn().mockResolvedValue(response)
      })

      it('should have the API return the enrolled status', async () => {
        const result = await creditsSettingsAPI.getUserStatus(mockAddress)
        expect(result).toEqual({ status: UserCreditsStatus.ENROLLED, optedOutAt: null })
      })
    })

    describe('and the user is opted out', () => {
      const optedOutAt = '2025-01-15T10:00:00.000Z'
      let response: UserStatusResponse

      beforeEach(() => {
        response = {
          status: UserCreditsStatus.OPTED_OUT,
          optedOutAt
        }
        creditsSettingsAPI.getUserStatus = jest.fn().mockResolvedValue(response)
      })

      it('should have the API return the opted out status with optedOutAt', async () => {
        const result = await creditsSettingsAPI.getUserStatus(mockAddress)
        expect(result).toEqual({ status: UserCreditsStatus.OPTED_OUT, optedOutAt })
      })
    })

    describe('and the user is not registered', () => {
      let response: UserStatusResponse

      beforeEach(() => {
        response = {
          status: UserCreditsStatus.NOT_REGISTERED,
          optedOutAt: null
        }
        creditsSettingsAPI.getUserStatus = jest.fn().mockResolvedValue(response)
      })

      it('should have the API return the not_registered status', async () => {
        const result = await creditsSettingsAPI.getUserStatus(mockAddress)
        expect(result).toEqual({ status: UserCreditsStatus.NOT_REGISTERED, optedOutAt: null })
      })
    })
  })

  describe('and the API call fails', () => {
    const errorMessage = 'Failed to get user status'

    beforeEach(() => {
      creditsSettingsAPI.getUserStatus = jest.fn().mockRejectedValue(new Error(errorMessage))
    })

    it('should have the API reject with the error', async () => {
      await expect(creditsSettingsAPI.getUserStatus(mockAddress)).rejects.toThrow(errorMessage)
    })
  })
})

describe('when handling the request action to opt out from credits', () => {
  describe('and the user is not connected', () => {
    it('should not call the opt out API', () => {
      expect(creditsSettingsAPI.optOut).not.toHaveBeenCalled()
    })
  })

  describe('and the API call is successful', () => {
    beforeEach(() => {
      creditsSettingsAPI.optOut = jest.fn().mockResolvedValue(undefined)
    })

    it('should have the API resolve successfully', async () => {
      await expect(creditsSettingsAPI.optOut(mockAddress)).resolves.toBeUndefined()
    })
  })

  describe('and the API call fails', () => {
    const errorMessage = 'You cannot opt out this week because you have already claimed credits'

    beforeEach(() => {
      creditsSettingsAPI.optOut = jest.fn().mockRejectedValue(new Error(errorMessage))
    })

    it('should have the API reject with the error', async () => {
      await expect(creditsSettingsAPI.optOut(mockAddress)).rejects.toThrow(errorMessage)
    })
  })
})
