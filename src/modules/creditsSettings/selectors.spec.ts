import { RootState } from '../reducer'
import { getUserCreditsStatusRequest, optOutFromCreditsRequest } from './actions'
import { buildInitialState } from './reducer'
import {
  getCreditsSettingsError,
  getCreditsStatus,
  getOptedOutAt,
  isEnrolled,
  isLoadingCreditsStatus,
  isNeverRegistered,
  isOptedOut,
  isOptingOut
} from './selectors'
import { CreditsSettingsState } from './types'

let creditsSettings: CreditsSettingsState
let state: RootState

beforeEach(() => {
  creditsSettings = buildInitialState()
  state = {
    creditsSettings
  } as RootState
})

describe('when selecting the credits status', () => {
  describe('and the status is null', () => {
    it('should return null', () => {
      expect(getCreditsStatus(state)).toBeNull()
    })
  })

  describe('and the status is enrolled', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, status: 'enrolled' }
      } as RootState
    })

    it('should return enrolled', () => {
      expect(getCreditsStatus(state)).toBe('enrolled')
    })
  })
})

describe('when selecting the optedOutAt', () => {
  const optedOutAt = '2025-01-15T10:00:00.000Z'

  describe('and optedOutAt is null', () => {
    it('should return null', () => {
      expect(getOptedOutAt(state)).toBeNull()
    })
  })

  describe('and optedOutAt is set', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, optedOutAt }
      } as RootState
    })

    it('should return the optedOutAt date', () => {
      expect(getOptedOutAt(state)).toBe(optedOutAt)
    })
  })
})

describe('when selecting the error', () => {
  describe('and there is no error', () => {
    it('should return null', () => {
      expect(getCreditsSettingsError(state)).toBeNull()
    })
  })

  describe('and there is an error', () => {
    const error = 'Some error message'

    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, error }
      } as RootState
    })

    it('should return the error', () => {
      expect(getCreditsSettingsError(state)).toBe(error)
    })
  })
})

describe('when asking whether the state is loading credits status', () => {
  describe('and the state is loading credits status', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, loading: [getUserCreditsStatusRequest()] }
      } as RootState
    })

    it('should return true', () => {
      expect(isLoadingCreditsStatus(state)).toBe(true)
    })
  })

  describe('and the state is not loading credits status', () => {
    it('should return false', () => {
      expect(isLoadingCreditsStatus(state)).toBe(false)
    })
  })
})

describe('when asking whether the state is opting out', () => {
  describe('and the state is opting out', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, loading: [optOutFromCreditsRequest()] }
      } as RootState
    })

    it('should return true', () => {
      expect(isOptingOut(state)).toBe(true)
    })
  })

  describe('and the state is not opting out', () => {
    it('should return false', () => {
      expect(isOptingOut(state)).toBe(false)
    })
  })
})

describe('when asking whether the user is enrolled', () => {
  describe('and the status is enrolled', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, status: 'enrolled' }
      } as RootState
    })

    it('should return true', () => {
      expect(isEnrolled(state)).toBe(true)
    })
  })

  describe('and the status is not enrolled', () => {
    it('should return false', () => {
      expect(isEnrolled(state)).toBe(false)
    })
  })
})

describe('when asking whether the user is opted out', () => {
  describe('and the status is opted_out', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, status: 'opted_out' }
      } as RootState
    })

    it('should return true', () => {
      expect(isOptedOut(state)).toBe(true)
    })
  })

  describe('and the status is not opted_out', () => {
    it('should return false', () => {
      expect(isOptedOut(state)).toBe(false)
    })
  })
})

describe('when asking whether the user is never registered', () => {
  describe('and the status is never_registered', () => {
    beforeEach(() => {
      state = {
        creditsSettings: { ...creditsSettings, status: 'never_registered' }
      } as RootState
    })

    it('should return true', () => {
      expect(isNeverRegistered(state)).toBe(true)
    })
  })

  describe('and the status is not never_registered', () => {
    it('should return false', () => {
      expect(isNeverRegistered(state)).toBe(false)
    })
  })
})
