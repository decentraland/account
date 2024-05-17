import { Dispatch } from 'redux'

export type Props = {
  isLoading: boolean
}

export type MapStateProps = Pick<Props, 'isLoading'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
