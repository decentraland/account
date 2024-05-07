import { Subscription } from '@dcl/schemas'
import {
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess
} from './actions'
import { buildInitialState, subscriptionReducer } from './reducer'
import { SubscriptionState } from './types'
import { transformSubscriptionDetailsToCamelCase, transformSubscriptionDetailsToSnakeCase } from './utils'

let state: SubscriptionState
let initialState: SubscriptionState
let subscription: Subscription

beforeEach(() => {
  state = buildInitialState()
  subscription = {
    address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
    email: 'email@example.org',
    details: transformSubscriptionDetailsToSnakeCase(state.subscriptionDetails)
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
      subscriptionDetails: { ...transformSubscriptionDetailsToCamelCase(subscription.details), ignoreAllInApp: true }
    }
  })

  it('should return a state with the  subscription details set, the email set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, getSubscriptionsSuccess(subscription))).toEqual({
      ...state,
      email: subscription.email,
      subscriptionDetails: transformSubscriptionDetailsToCamelCase(subscription.details),
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
      subscriptionDetails: { ...transformSubscriptionDetailsToCamelCase(subscription.details), ignoreAllInApp: true }
    }
  })

  it('should return a state with the details of subscription set, email set and the loading state cleared', () => {
    expect(subscriptionReducer(initialState, saveSubscriptionsSuccess(subscription.details))).toEqual({
      ...state,
      subscriptionDetails: transformSubscriptionDetailsToCamelCase(subscription.details),
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
