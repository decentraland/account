import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Dispatch } from 'redux'
import { ClearCreditsSettingsErrorAction, OptOutFromCreditsRequestAction } from '../../../modules/creditsSettings/actions'

export type Props = Omit<ModalProps, 'onClose'> & {
  isLoading: boolean
  error: string | null
  onClose: () => void
  onClearError: () => void
  onOptOut: () => void
}

export type MapStateProps = Pick<Props, 'isLoading' | 'error'>
export type MapDispatchProps = Pick<Props, 'onOptOut' | 'onClearError'>
export type MapDispatch = Dispatch<OptOutFromCreditsRequestAction | ClearCreditsSettingsErrorAction>
