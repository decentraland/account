import { getFeatureVariant, getIsFeatureEnabled, hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { RootState } from '../reducer'
import { FeatureName } from './types'

export const getIsAuthDappEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.DAPPS, FeatureName.AUTH_DAPP)
  }
  return false
}

export const getIsSubscriptionEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.DAPPS, FeatureName.SUBSCRIPTION)
  }
  return false
}

export const getIsNavbar2Enabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.DAPPS, FeatureName.NAVBAR_UI2)
  }
  return false
}

export const getWhitelistedCreditsWallet = (state: RootState): string[] => {
  if (hasLoadedInitialFlags(state)) {
    const result = getFeatureVariant(state, ApplicationName.EXPLORER, FeatureName.USER_WALLETS)

    if (result?.enabled) {
      return (
        result?.payload?.value
          ?.replace('\n', '')
          .split(',')
          .map(wallet => wallet.toLowerCase()) ?? []
      )
    }
  }

  return []
}
