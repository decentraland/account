import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { OpenModalAction } from '../../../../modules/modal/actions'

export type Props = {
  address?: string
  network: Network
  title: string
  amount: number
  onSend: (network: Network) => void
  onReceive: (network: Network, address: string) => void
  onConvert: (network: Network) => void
}

export type MapStateProps = Pick<Props, 'address'>
export type MapDispatchProps = Pick<Props, 'onSend' | 'onReceive' | 'onConvert'>
export type MapDispatch = Dispatch<OpenModalAction>
