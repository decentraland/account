import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { GET_USER_CREDITS_STATUS_REQUEST, OPT_OUT_FROM_CREDITS_REQUEST } from './actions'

const getState = (state: RootState) => state.creditsSettings

export const getCreditsStatus = (state: RootState) => getState(state).status
export const getOptedOutAt = (state: RootState) => getState(state).optedOutAt
export const getCreditsSettingsError = (state: RootState) => getState(state).error
export const getLoading = (state: RootState) => getState(state).loading

export const isLoadingCreditsStatus = (state: RootState) => isLoadingType(getLoading(state), GET_USER_CREDITS_STATUS_REQUEST)
export const isOptingOut = (state: RootState) => isLoadingType(getLoading(state), OPT_OUT_FROM_CREDITS_REQUEST)

export const isEnrolled = (state: RootState) => getCreditsStatus(state) === 'enrolled'
export const isOptedOut = (state: RootState) => getCreditsStatus(state) === 'opted_out'
export const isNeverRegistered = (state: RootState) => getCreditsStatus(state) === 'never_registered'
