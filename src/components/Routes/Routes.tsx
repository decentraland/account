import { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { EnhancedIntercom } from 'decentraland-dapps/dist/containers/EnhancedIntercom'
import { usePageTracking } from 'decentraland-dapps/dist/hooks/usePageTracking'
import { config } from '../../config'
import { locations } from '../../modules/locations'
import { ConfirmPage } from '../ConfirmPage'
import CreditsEmail from '../CreditsEmail/CreditsEmail.container'
import { MainPage } from '../MainPage'
import { ProtectedRoute } from '../ProtectedRoute'
import { SignInPage } from '../SignInPage'
import { Props } from './Routes.types'

const Routes = ({ closeAllModals }: Props) => {
  const APP_ID = config.get('INTERCOM_APP_ID')
  const location = useLocation()
  usePageTracking()

  useEffect(() => {
    closeAllModals()
  }, [location.pathname])

  const isCreditsEmailPage = location.pathname.startsWith('/credits-email-confirmed/')

  return (
    <>
      <Switch>
        <Route path={locations.creditsEmail()} component={CreditsEmail} />
        <Route path={locations.signIn()} component={SignInPage} />
        <ProtectedRoute path={locations.confirmEmail()} component={ConfirmPage} />
        <ProtectedRoute path={locations.root()} component={MainPage} />
        <Redirect to={locations.root()} />
      </Switch>
      {APP_ID && !isCreditsEmailPage ? <EnhancedIntercom appId={APP_ID} settings={{ alignment: 'right' }} /> : null}
    </>
  )
}

export default Routes
