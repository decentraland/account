import { Dispatch } from 'redux'

export type Props = {
  isConnected: boolean
  closeAllModals: () => void
}

export type MapStateProps = Pick<Props, 'isConnected'>

export type MapDispatchProps = Pick<Props, 'closeAllModals'>
export type MapDispatch = Dispatch
