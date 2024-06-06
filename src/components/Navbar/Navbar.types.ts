import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar.types'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  isAuthDappEnabled: boolean
  address?: string
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'isAuthDappEnabled' | 'address'>
