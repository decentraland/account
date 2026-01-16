import { Dispatch } from 'redux'
import {
  GetUserCreditsStatusRequestAction,
  OptOutFromCreditsRequestAction,
  getUserCreditsStatusRequest
} from '../../modules/creditsSettings/actions'
import { UserCreditsStatus } from '../../modules/creditsSettings/types'

export type Props = {
  status: UserCreditsStatus | null
  optedOutAt: string | null
  isLoading: boolean
  isOptingOut: boolean
  error: string | null
  onGetUserCreditsStatus: typeof getUserCreditsStatusRequest
  onOpenOptOutModal: () => void
}

export type MapStateProps = Pick<Props, 'status' | 'optedOutAt' | 'isLoading' | 'isOptingOut' | 'error'>
export type MapDispatchProps = Pick<Props, 'onGetUserCreditsStatus' | 'onOpenOptOutModal'>
export type MapDispatch = Dispatch<GetUserCreditsStatusRequestAction | OptOutFromCreditsRequestAction>
