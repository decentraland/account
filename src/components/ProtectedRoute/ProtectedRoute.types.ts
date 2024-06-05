import { RouteProps } from 'react-router-dom'

export type Props = RouteProps & {
  isConnected: boolean
  isConnecting: boolean
}

export type MapStateProps = Pick<Props, 'isConnecting' | 'isConnected'>
