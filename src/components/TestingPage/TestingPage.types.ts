import { UserCreditsStatus } from '../../lib/api/credits'

export enum TestingView {
  CREDITS_ENROLLED = 'credits_enrolled',
  CREDITS_OPTED_OUT = 'credits_opted_out',
  CREDITS_NOT_REGISTERED = 'credits_not_registered',
  CREDITS_LOADING = 'credits_loading',
  OPT_OUT_MODAL = 'opt_out_modal',
  OPT_OUT_MODAL_LOADING = 'opt_out_modal_loading',
  OPT_OUT_MODAL_ERROR = 'opt_out_modal_error'
}

export interface TestingViewOption {
  value: TestingView
  label: string
  category: 'Credits Settings' | 'Opt Out Modal'
}

export interface MockCreditsState {
  status: UserCreditsStatus | null
  optedOutAt: string | null
  isLoading: boolean
  isOptingOut: boolean
  error: string | null
}

export interface MockOptOutModalState {
  isLoading: boolean
  error: string | null
}
