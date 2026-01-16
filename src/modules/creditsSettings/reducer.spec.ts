import {
  clearCreditsSettingsError,
  getUserCreditsStatusFailure,
  getUserCreditsStatusRequest,
  getUserCreditsStatusSuccess,
  optOutFromCreditsFailure,
  optOutFromCreditsRequest,
  optOutFromCreditsSuccess
} from './actions'
import { buildInitialState, creditsSettingsReducer } from './reducer'
import { CreditsSettingsState } from './types'

let state: CreditsSettingsState
let initialState: CreditsSettingsState

beforeEach(() => {
  state = buildInitialState()
})

describe('when reducing the get user credits status request action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(creditsSettingsReducer(initialState, getUserCreditsStatusRequest())).toEqual({
      ...state,
      loading: [getUserCreditsStatusRequest()],
      error: null
    })
  })
})

describe('when reducing the get user credits status success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      loading: [getUserCreditsStatusRequest()]
    }
  })

  describe('and the user is enrolled', () => {
    it('should return a state with status enrolled and the loading state cleared', () => {
      expect(creditsSettingsReducer(initialState, getUserCreditsStatusSuccess('enrolled', null))).toEqual({
        ...state,
        status: 'enrolled',
        optedOutAt: null,
        loading: [],
        error: null
      })
    })
  })

  describe('and the user is opted out', () => {
    const optedOutAt = '2025-01-15T10:00:00.000Z'

    it('should return a state with status opted_out and optedOutAt set', () => {
      expect(creditsSettingsReducer(initialState, getUserCreditsStatusSuccess('opted_out', optedOutAt))).toEqual({
        ...state,
        status: 'opted_out',
        optedOutAt,
        loading: [],
        error: null
      })
    })
  })

  describe('and the user is never registered', () => {
    it('should return a state with status never_registered', () => {
      expect(creditsSettingsReducer(initialState, getUserCreditsStatusSuccess('never_registered', null))).toEqual({
        ...state,
        status: 'never_registered',
        optedOutAt: null,
        loading: [],
        error: null
      })
    })
  })
})

describe('when reducing the get user credits status failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [getUserCreditsStatusRequest()] }
    error = 'Failed to get status'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(creditsSettingsReducer(initialState, getUserCreditsStatusFailure(error))).toEqual({
      ...state,
      loading: [],
      error
    })
  })
})

describe('when reducing the opt out from credits request action', () => {
  beforeEach(() => {
    initialState = { ...state, status: 'enrolled', error: 'some error' }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(creditsSettingsReducer(initialState, optOutFromCreditsRequest())).toEqual({
      ...initialState,
      loading: [optOutFromCreditsRequest()],
      error: null
    })
  })
})

describe('when reducing the opt out from credits success action', () => {
  beforeEach(() => {
    initialState = {
      ...state,
      status: 'enrolled',
      loading: [optOutFromCreditsRequest()]
    }
  })

  it('should return a state with status opted_out and optedOutAt set to current time', () => {
    const result = creditsSettingsReducer(initialState, optOutFromCreditsSuccess())

    expect(result.status).toBe('opted_out')
    expect(result.optedOutAt).toBeDefined()
    expect(result.loading).toEqual([])
    expect(result.error).toBeNull()
  })
})

describe('when reducing the opt out from credits failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, status: 'enrolled', loading: [optOutFromCreditsRequest()] }
    error = 'You cannot opt out this week because you have already claimed credits'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(creditsSettingsReducer(initialState, optOutFromCreditsFailure(error))).toEqual({
      ...initialState,
      loading: [],
      error
    })
  })
})

describe('when reducing the clear credits settings error action', () => {
  beforeEach(() => {
    initialState = { ...state, error: 'some error' }
  })

  it('should return a state without the error', () => {
    expect(creditsSettingsReducer(initialState, clearCreditsSettingsError())).toEqual({
      ...state,
      error: null
    })
  })
})
