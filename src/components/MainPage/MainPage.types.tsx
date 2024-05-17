import { Dispatch } from 'redux'
import { GetSubscriptionsRequestAction, getSubscriptionsRequest } from '../../modules/subscription/actions'

export type Props = {
  isLoading: boolean
  onGetNotificationSetting: typeof getSubscriptionsRequest
}

export type MapStateProps = Pick<Props, 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onGetNotificationSetting'>
export type MapDispatch = Dispatch<GetSubscriptionsRequestAction>
