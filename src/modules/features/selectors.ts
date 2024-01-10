import {
  getIsFeatureEnabled,
  hasLoadedInitialFlags,
} from 'decentraland-dapps/dist/modules/features/selectors'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { RootState } from '../reducer'
import { FeatureName } from './types'

export const getIsAuthDappEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(
      state,
      ApplicationName.DAPPS,
      FeatureName.AUTH_DAPP
    )
  }
  return false
}

export const getIsNavbarV2Enabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(
      state,
      ApplicationName.DAPPS,
      FeatureName.NAVBAR_V2
    )
  }
  return false
}
