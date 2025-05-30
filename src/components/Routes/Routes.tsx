import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { EnhancedIntercom } from 'decentraland-dapps/dist/containers/EnhancedIntercom'
import { usePageTracking } from 'decentraland-dapps/dist/hooks/usePageTracking'
import { config } from '../../config'
import { getIsTurnstileVerificationEnabled } from '../../modules/features/selectors'
import { locations } from '../../modules/locations'
import { RootState } from '../../modules/reducer'
import { ConfirmPage } from '../ConfirmPage'
import CreditsEmail from '../CreditsEmail/CreditsEmail.container'
import { MainPage } from '../MainPage'
import { ProtectedRoute } from '../ProtectedRoute'
import { SignInPage } from '../SignInPage'
import { UnifiedEmailConfirmation } from '../UnifiedEmailConfirmation'
import { Props } from './Routes.types'

const Routes = ({ closeAllModals }: Props) => {
  const APP_ID = config.get('INTERCOM_APP_ID')
  const location = useLocation()
  const isTurnstileEnabled = useSelector((state: RootState) => getIsTurnstileVerificationEnabled(state))
  usePageTracking()

  useEffect(() => {
    closeAllModals()
  }, [location.pathname])

  const isEmailConfirmationPage =
    location.pathname.startsWith('/confirm-email/') || location.pathname.startsWith('/credits-email-confirmed/')

  return (
    <>
      <Switch>
        {isTurnstileEnabled ? (
          <>
            <Route path={locations.unifiedEmailConfirmation()} component={UnifiedEmailConfirmation} />
            <Route path={locations.creditsEmail()} component={UnifiedEmailConfirmation} />
          </>
        ) : (
          <>
            <ProtectedRoute path={locations.confirmEmail()} component={ConfirmPage} />
            <Route path={locations.creditsEmail()} component={CreditsEmail} />
          </>
        )}
        <Route path={locations.signIn()} component={SignInPage} />
        <ProtectedRoute path={locations.root()} component={MainPage} />
        <Redirect to={locations.root()} />
      </Switch>
      {APP_ID && !isEmailConfirmationPage ? <EnhancedIntercom appId={APP_ID} settings={{ alignment: 'right' }} /> : null}
    </>
  )
}

export default Routes
