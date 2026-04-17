import { objectToSnake } from 'ts-case-convert'
import { NotificationsAPI } from '../../lib/notifications/NotificationsAPI'
import { buildInitialState } from './reducer'
import { SubscriptionFromClient } from './types'

let notificationsAPI: jest.Mocked<NotificationsAPI>
let walletAddress: string
let subscriptionSettings: SubscriptionFromClient
let unconfirmedEmail: string

beforeEach(() => {
  walletAddress = 'testUser'
  unconfirmedEmail = 'example@decentraland.org'
  const subscriptionSettingsState = buildInitialState()

  notificationsAPI = {
    getSubscription: jest.fn(),
    putSubscription: jest.fn(),
    putEmail: jest.fn(),
    postEmailConfirmationCode: jest.fn()
  } as unknown as jest.Mocked<NotificationsAPI>

  subscriptionSettings = {
    email: subscriptionSettingsState.email,
    details: objectToSnake(subscriptionSettingsState.subscriptionDetails),
    address: walletAddress
  }
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('when handling the request action to fetch the subscription', () => {
  describe('and the notification API call is successful', () => {
    beforeEach(() => {
      notificationsAPI.getSubscription = jest.fn().mockResolvedValue(subscriptionSettings)
    })

    it('should put a fetch subscription success action with the subscription', async () => {
      const result = await notificationsAPI.getSubscription()
      expect(result).toEqual(subscriptionSettings)
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to fetch subscription for ${walletAddress}`
      notificationsAPI.getSubscription = jest.fn().mockRejectedValue(new Error(errorMessage))
    })

    it('should have the API reject with the error', async () => {
      await expect(notificationsAPI.getSubscription()).rejects.toThrow(errorMessage)
    })
  })
})

describe('when handling the request action to save the subscription', () => {
  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to save subscription for ${walletAddress}`
      notificationsAPI.putSubscription = jest.fn().mockRejectedValue(new Error(errorMessage))
    })

    it('should have the API reject with the error', async () => {
      await expect(notificationsAPI.putSubscription(subscriptionSettings.details)).rejects.toThrow(errorMessage)
    })
  })

  describe('and the notification API call is successful', () => {
    beforeEach(() => {
      notificationsAPI.putSubscription = jest.fn().mockResolvedValue(subscriptionSettings)
    })

    it('should have the API resolve successfully', async () => {
      await expect(notificationsAPI.putSubscription(subscriptionSettings.details)).resolves.toEqual(subscriptionSettings)
    })
  })
})

describe('when handling the request action to save the subscription email', () => {
  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to save email ${unconfirmedEmail}`
      notificationsAPI.putEmail = jest.fn().mockRejectedValue(new Error(errorMessage))
    })

    it('should have the API reject with the error', async () => {
      await expect(notificationsAPI.putEmail(unconfirmedEmail)).rejects.toThrow(errorMessage)
    })
  })

  describe('and the notification API call is successful', () => {
    beforeEach(() => {
      notificationsAPI.putEmail = jest.fn().mockResolvedValue(subscriptionSettings)
    })

    it('should have the API resolve successfully', async () => {
      await expect(notificationsAPI.putEmail(unconfirmedEmail)).resolves.toEqual(subscriptionSettings)
    })
  })
})

describe('when handling the request action to validate the subscription email', () => {
  let validationBody: {
    address: string
    code: string
  }

  beforeEach(() => {
    validationBody = {
      address: unconfirmedEmail,
      code: '123456'
    }
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to validate email ${unconfirmedEmail}`
      notificationsAPI.postEmailConfirmationCode = jest.fn().mockRejectedValue(new Error(errorMessage))
    })

    it('should have the API reject with the error', async () => {
      await expect(notificationsAPI.postEmailConfirmationCode(validationBody)).rejects.toThrow(errorMessage)
    })
  })

  describe('and the notification API call is successful', () => {
    beforeEach(() => {
      notificationsAPI.postEmailConfirmationCode = jest.fn().mockResolvedValue({ ...subscriptionSettings, address: unconfirmedEmail })
    })

    it('should have the API resolve successfully', async () => {
      await expect(notificationsAPI.postEmailConfirmationCode(validationBody)).resolves.toEqual({
        ...subscriptionSettings,
        address: unconfirmedEmail
      })
    })
  })
})
