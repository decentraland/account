import { action } from 'typesafe-actions'
import { UserCreditsStatus } from './types'

// Get user credits status actions
export const GET_USER_CREDITS_STATUS_REQUEST = '[Request] Get User Credits Status'
export const GET_USER_CREDITS_STATUS_SUCCESS = '[Success] Get User Credits Status'
export const GET_USER_CREDITS_STATUS_FAILURE = '[Failure] Get User Credits Status'

export const getUserCreditsStatusRequest = () => action(GET_USER_CREDITS_STATUS_REQUEST)
export const getUserCreditsStatusSuccess = (status: UserCreditsStatus, optedOutAt: string | null) =>
  action(GET_USER_CREDITS_STATUS_SUCCESS, { status, optedOutAt })
export const getUserCreditsStatusFailure = (error: string) => action(GET_USER_CREDITS_STATUS_FAILURE, { error })

export type GetUserCreditsStatusRequestAction = ReturnType<typeof getUserCreditsStatusRequest>
export type GetUserCreditsStatusSuccessAction = ReturnType<typeof getUserCreditsStatusSuccess>
export type GetUserCreditsStatusFailureAction = ReturnType<typeof getUserCreditsStatusFailure>

// Opt-out from credits actions
export const OPT_OUT_FROM_CREDITS_REQUEST = '[Request] Opt Out From Credits'
export const OPT_OUT_FROM_CREDITS_SUCCESS = '[Success] Opt Out From Credits'
export const OPT_OUT_FROM_CREDITS_FAILURE = '[Failure] Opt Out From Credits'

export const optOutFromCreditsRequest = () => action(OPT_OUT_FROM_CREDITS_REQUEST)
export const optOutFromCreditsSuccess = () => action(OPT_OUT_FROM_CREDITS_SUCCESS)
export const optOutFromCreditsFailure = (error: string) => action(OPT_OUT_FROM_CREDITS_FAILURE, { error })

export type OptOutFromCreditsRequestAction = ReturnType<typeof optOutFromCreditsRequest>
export type OptOutFromCreditsSuccessAction = ReturnType<typeof optOutFromCreditsSuccess>
export type OptOutFromCreditsFailureAction = ReturnType<typeof optOutFromCreditsFailure>

// Clear error action
export const CLEAR_CREDITS_SETTINGS_ERROR = 'Clear Credits Settings Error'
export const clearCreditsSettingsError = () => action(CLEAR_CREDITS_SETTINGS_ERROR)

export type ClearCreditsSettingsErrorAction = ReturnType<typeof clearCreditsSettingsError>
