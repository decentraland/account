export type Props = {
  isAuthDappEnabled: boolean,
  isConnecting: boolean
}

export type MapStateProps = Pick<Props, 'isAuthDappEnabled' | 'isConnecting'>
