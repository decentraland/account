import { UserCreditsStatus } from '../../lib/api/credits'
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
      expect(creditsSettingsReducer(initialState, getUserCreditsStatusSuccess(UserCreditsStatus.ENROLLED, null))).toEqual({
        ...state,
        status: UserCreditsStatus.ENROLLED,
        optedOutAt: null,
        loading: [],
        error: null
      })
    })
  })

  describe('and the user is opted out', () => {
    const optedOutAt = '2025-01-15T10:00:00.000Z'

    it('should return a state with status opted_out and optedOutAt set', () => {
      expect(creditsSettingsReducer(initialState, getUserCreditsStatusSuccess(UserCreditsStatus.OPTED_OUT, optedOutAt))).toEqual({
        ...state,
        status: UserCreditsStatus.OPTED_OUT,
        optedOutAt,
        loading: [],
        error: null
      })
    })
  })

  describe('and the user is not registered', () => {
    it('should return a state with status not_registered', () => {
      expect(creditsSettingsReducer(initialState, getUserCreditsStatusSuccess(UserCreditsStatus.NOT_REGISTERED, null))).toEqual({
        ...state,
        status: UserCreditsStatus.NOT_REGISTERED,
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
    initialState = { ...state, status: UserCreditsStatus.ENROLLED, error: 'some error' }
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
      status: UserCreditsStatus.ENROLLED,
      loading: [optOutFromCreditsRequest()]
    }
  })

  it('should return a state with status opted_out and optedOutAt set to current time', () => {
    const result = creditsSettingsReducer(initialState, optOutFromCreditsSuccess())

    expect(result.status).toBe(UserCreditsStatus.OPTED_OUT)
    expect(result.optedOutAt).toBeDefined()
    expect(result.loading).toEqual([])
    expect(result.error).toBeNull()
  })
})

describe('when reducing the opt out from credits failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, status: UserCreditsStatus.ENROLLED, loading: [optOutFromCreditsRequest()] }
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
