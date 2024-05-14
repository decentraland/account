import { Subscription } from '@dcl/schemas'
import { objectToCamel, objectToSnake } from 'ts-case-convert'
import {
  clearSaveSubscriptionError,
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess
} from './actions'
import { buildInitialState, subscriptionReducer } from './reducer'
import { SubscriptionState } from './types'

let state: SubscriptionState
let initialState: SubscriptionState
let subscription: Subscription

beforeEach(() => {
  state = buildInitialState()
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

  it('should return a state with the  subscription details set, the email set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, getSubscriptionsSuccess(subscription))).toEqual({
      ...state,
      email: subscription.email,
      subscriptionDetails: objectToCamel(subscription.details),
      loading: [],
      error: null
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
