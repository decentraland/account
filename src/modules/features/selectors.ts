import { getIsFeatureEnabled, hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { RootState } from '../reducer'
import { FeatureName } from './types'

export const getIsStreamingEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.DAPPS, FeatureName.STREAMING)
  }
  return false
}

export const getIsTurnstileVerificationEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.DAPPS, FeatureName.TURNSTILE_VERIFICATION)
  }
  return false
}

export const getIsReferralEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.DAPPS, FeatureName.REFERRAL)
  }
  return false
}
