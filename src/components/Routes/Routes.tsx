import { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { EnhancedIntercom } from 'decentraland-dapps/dist/containers/EnhancedIntercom'
import { usePageTracking } from 'decentraland-dapps/dist/hooks/usePageTracking'
import { config } from '../../config'
import { locations } from '../../modules/locations'
import { LegacyEmailConfirmRedirect } from '../LegacyEmailConfirmRedirect'
import { MainPage } from '../MainPage'
import { ProtectedRoute } from '../ProtectedRoute'
import { SignInPage } from '../SignInPage'
import { UnifiedEmailConfirmation } from '../UnifiedEmailConfirmation'
import { Props } from './Routes.types'

const Routes = ({ closeAllModals }: Props) => {
  const APP_ID = config.get('INTERCOM_APP_ID')
  const location = useLocation()
  usePageTracking()

  useEffect(() => {
    closeAllModals()
  }, [location.pathname])

  const isEmailConfirmationPage =
    location.pathname.startsWith('/confirm-email/') ||
    location.pathname.startsWith('/credits-email-confirmed/') ||
    location.pathname.startsWith('/confirm-email-challenge/')

  return (
    <>
      <Switch>
        <Route path={locations.unifiedEmailConfirmation()} component={UnifiedEmailConfirmation} />
        <Route path={locations.confirmEmail()} render={() => <LegacyEmailConfirmRedirect path="/confirm-email/:token" />} />
        <Route path={locations.creditsEmail()} render={() => <LegacyEmailConfirmRedirect path="/credits-email-confirmed/:token" />} />

        <Route path={locations.signIn()} component={SignInPage} />
        <ProtectedRoute path={locations.root()} component={MainPage} />
        <Redirect to={locations.root()} />
      </Switch>
      {APP_ID && !isEmailConfirmationPage ? <EnhancedIntercom appId={APP_ID} settings={{ alignment: 'right' }} /> : null}
    </>
  )
}

export default Routes
