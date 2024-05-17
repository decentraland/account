import { objectToCamel, objectToSnake } from 'ts-case-convert'
import {
  clearSaveSubscriptionError,
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionEmailFailure,
  saveSubscriptionEmailRequest,
  saveSubscriptionEmailSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess,
  validateSubscriptionEmailFailure,
  validateSubscriptionEmailRequest,
  validateSubscriptionEmailSuccess
} from './actions'
import { buildInitialState, subscriptionReducer } from './reducer'
import { SubscriptionFromClient, SubscriptionState } from './types'

let state: SubscriptionState
let initialState: SubscriptionState
let subscription: SubscriptionFromClient
let unconfirmedEmail: string
let validationBody: {
  address: string
  code: string
}

beforeEach(() => {
  state = buildInitialState()
  unconfirmedEmail = 'example@decentraland.org'
  subscription = {
    address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
    email: 'email@example.org',
    details: objectToSnake(state.subscriptionDetails)
  }
})

describe('when reducing the get subscription request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(subscriptionReducer(initialState, getSubscriptionsRequest())).toEqual({
      ...state,
      loading: [getSubscriptionsRequest()],
      error: null
    })
  })
})

describe('when reducing the get subscription success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      loading: [getSubscriptionsRequest()],
      subscriptionDetails: { ...objectToCamel(subscription.details), ignoreAllInApp: true }
    }
  })
  describe('and there is no email nor unconfirmedEmail', () => {
    it('should return a state with the subscription details set without the email and the loading state cleared', () => {
      expect(subscriptionReducer(initialState, getSubscriptionsSuccess({ ...subscription, email: '' }))).toEqual({
        ...state,
        email: '',
        subscriptionDetails: objectToCamel(subscription.details),
        loading: [],
        error: null
      })
    })
  })
  describe('and there is an unconfirmedEmail pending', () => {
    it('should return a state with the subscription details set with the unconfirmed email set and the loading state cleared', () => {
      expect(subscriptionReducer(initialState, getSubscriptionsSuccess({ ...subscription, email: '', unconfirmedEmail }))).toEqual({
        ...state,
        email: '',
        unconfirmedEmail,
        subscriptionDetails: objectToCamel(subscription.details),
        loading: [],
        error: null
      })
    })
  })

  describe('and there is an email but no unconfirmedEmail', () => {
    it('should return a state with the subscription details set, the email set and the loading state cleared', () => {
      expect(subscriptionReducer(initialState, getSubscriptionsSuccess(subscription))).toEqual({
        ...state,
        email: subscription.email,
        subscriptionDetails: objectToCamel(subscription.details),
        loading: [],
        error: null
      })
    })
  })

  describe('and there is an email and an unconfirmedEmail', () => {
    it('should return a state with the subscription details set, the email and the unconfirmed email set and the loading state cleared', () => {
      expect(subscriptionReducer(initialState, getSubscriptionsSuccess({ ...subscription, unconfirmedEmail }))).toEqual({
        ...state,
        email: subscription.email,
        unconfirmedEmail,
        subscriptionDetails: objectToCamel(subscription.details),
        loading: [],
        error: null
      })
    })
  })
})

describe('when reducing the get subscription failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [getSubscriptionsRequest()] }
    error = 'some error'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, getSubscriptionsFailure(error))).toEqual({
      ...state,
      loading: [],
      error: error
    })
  })
})

describe('when reducing the update of the subscription request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionsRequest(subscription.details))).toEqual({
      ...state,
      loading: [saveSubscriptionsRequest(subscription.details)],
      error: null
    })
  })
})

describe('when reducing the update of the subscription success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      loading: [saveSubscriptionsRequest(subscription.details)],
      subscriptionDetails: { ...objectToCamel(subscription.details), ignoreAllInApp: true }
    }
  })

  it('should return a state with the details of subscription set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionsSuccess(subscription.details))).toEqual({
      ...state,
      subscriptionDetails: objectToCamel(subscription.details),
      loading: [],
      error: null
    })
  })
})

describe('when reducing update of the subscription failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [saveSubscriptionsRequest(subscription.details)] }
    error = 'some error'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionsFailure(error))).toEqual({
      ...state,
      loading: [],
      error: error
    })
  })
})

describe('when reducing update of the subscription error clear action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state without the error', () => {
    expect(subscriptionReducer(initialState, clearSaveSubscriptionError())).toEqual({
      ...state,
      error: null
    })
  })
})

describe('when reducing the update of the email subscription request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionEmailRequest(unconfirmedEmail))).toEqual({
      ...state,
      loading: [saveSubscriptionEmailRequest(unconfirmedEmail)],
      error: null
    })
  })
})

describe('when reducing the update of the email subscription success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      loading: [saveSubscriptionEmailRequest(unconfirmedEmail)]
    }
  })

  it('should return a state with the unconfirmed email set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionEmailSuccess(unconfirmedEmail))).toEqual({
      ...state,
      unconfirmedEmail: unconfirmedEmail,
      loading: [],
      error: null
    })
  })
})

describe('when reducing update of the email subscription failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [saveSubscriptionEmailRequest(unconfirmedEmail)] }
    error = 'some error'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionEmailFailure(error))).toEqual({
      ...state,
      loading: [],
      error: error
    })
  })
})

describe('when reducing the validation of the email subscription request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
    validationBody = {
      address: unconfirmedEmail,
      code: '123456'
    }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(subscriptionReducer(initialState, validateSubscriptionEmailRequest(validationBody))).toEqual({
      ...state,
      loading: [validateSubscriptionEmailRequest(validationBody)],
      error: null
    })
  })
})

describe('when reducing the validation of the email subscription success action', () => {
  beforeEach(() => {
    unconfirmedEmail = 'example@decentraland.org'
    validationBody = {
      address: unconfirmedEmail,
      code: '123456'
    }
    initialState = {
      ...state,
      loading: [validateSubscriptionEmailRequest(validationBody)]
    }
  })

  it('should return a state with the new email set, the unconfirmedEmail undefined and the loading state cleared', () => {
    expect(subscriptionReducer({ ...initialState, unconfirmedEmail }, validateSubscriptionEmailSuccess())).toEqual({
      ...state,
      unconfirmedEmail: undefined,
      loading: [],
      error: null
    })
  })
})

describe('when reducing the validation of the email subscription failure action', () => {
  let error: string

  beforeEach(() => {
    validationBody = {
      address: unconfirmedEmail,
      code: '123456'
    }
    initialState = { ...state, loading: [validateSubscriptionEmailRequest(validationBody)] }
    error = 'some error'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, validateSubscriptionEmailFailure(error))).toEqual({
      ...state,
      loading: [],
      error: error
    })
  })
})
