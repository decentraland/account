export type Props = {
  hasActivity: boolean
  isConnected: boolean
  address?: string
  [key: string]: unknown
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'address'>
