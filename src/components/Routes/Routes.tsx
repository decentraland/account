import { useEffect } from 'react'
import { Navigate, Route, Routes as RouterRoutes, useLocation } from 'react-router-dom'
import { usePageTracking } from '@dcl/hooks'
import { locations } from '../../modules/locations'
import { LegacyEmailConfirmRedirect } from '../LegacyEmailConfirmRedirect'
import { MainPage } from '../MainPage'
import { ProtectedRoute } from '../ProtectedRoute'
import { SignInPage } from '../SignInPage'
import { UnifiedEmailConfirmation } from '../UnifiedEmailConfirmation'
import { Props } from './Routes.types'

const Routes = ({ closeAllModals }: Props) => {
  const location = useLocation()
  usePageTracking(location.pathname)

  useEffect(() => {
    closeAllModals()
  }, [location.pathname])

  return (
    <RouterRoutes>
      <Route path={locations.unifiedEmailConfirmation()} element={<UnifiedEmailConfirmation />} />
      <Route path={locations.confirmEmail()} element={<LegacyEmailConfirmRedirect path="/confirm-email/:token" />} />
      <Route path={locations.creditsEmail()} element={<LegacyEmailConfirmRedirect path="/credits-email-confirmed/:token" />} />

      <Route path={locations.signIn()} element={<SignInPage />} />
      <Route
        path={locations.root()}
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={locations.root()} replace />} />
    </RouterRoutes>
  )
}

export default Routes
