import { Dispatch } from 'redux'

export type Props = {
  isLoading: boolean
  defaultTab: string
}

export type MapStateProps = Pick<Props, 'isLoading' | 'defaultTab'>
export type OwnProps = Pick<Props, 'defaultTab'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
