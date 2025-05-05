import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar.types'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  address?: string
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'address'>
