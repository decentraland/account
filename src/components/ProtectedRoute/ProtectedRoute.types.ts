export type Props = {
  children: React.ReactNode
  isConnected: boolean
  isConnecting: boolean
}

export type MapStateProps = Pick<Props, 'isConnecting' | 'isConnected'>
