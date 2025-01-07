import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar.types'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  isConnected: boolean
  isAuthDappEnabled: boolean
  address?: string
  isNavbar2Enabled: boolean
}

export type MapStateProps = Pick<Props, 'hasActivity' | 'isConnected' | 'isAuthDappEnabled' | 'address' | 'isNavbar2Enabled'>
