import { RouteProps } from 'react-router-dom'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'

export type Props = RouteProps & {
  isConnected: boolean
  isConnecting: boolean
  wallet: Wallet | null
}

export type MapStateProps = Pick<Props, 'wallet' | 'isConnecting' | 'isConnected'>
