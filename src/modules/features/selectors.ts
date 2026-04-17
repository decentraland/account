import { RootState } from '../reducer'

// Feature flags are not yet connected to a backend.
// For now, return true for all features. In the future, connect to a feature flag service.

export function hasLoadedInitialFlags(_state: RootState): boolean {
  return true
}

export function getIsFeatureEnabled(_state: RootState, _app: string, _feature: string): boolean {
  return true
}

export const getIsStreamingEnabled = (_state: RootState) => true

export const getIsTurnstileVerificationEnabled = (_state: RootState) => true

export const getIsReferralEnabled = (_state: RootState) => true
