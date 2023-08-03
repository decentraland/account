import {
  getIsFeatureEnabled,
  hasLoadedInitialFlags,
} from 'decentraland-dapps/dist/modules/features/selectors'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { RootState } from '../reducer'
import { FeatureName } from './types'

export const getIsProfileSiteEnabled = (state: RootState): boolean => {
  try {
    if (hasLoadedInitialFlags(state)) {
      return getIsFeatureEnabled(
        state,
        ApplicationName.DAPPS,
        FeatureName.PROFILE_SITE
      )
    }
    return false
  } catch (e) {
    return false
  }
}
