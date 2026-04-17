import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { LegacyEmailConfirmRedirect } from './components/LegacyEmailConfirmRedirect'
import { MainPage } from './components/MainPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignInPage } from './components/SignInPage'
import { UnifiedEmailConfirmation } from './components/UnifiedEmailConfirmation'

const basename = /^decentraland\.(zone|org|today)$/.test(window.location.host) ? '/account' : undefined

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: '/confirm-email-challenge/:token',
          element: <UnifiedEmailConfirmation />
        },
        {
          path: '/confirm-email/:token',
          element: <LegacyEmailConfirmRedirect path="/confirm-email/:token" />
        },
        {
          path: '/credits-email-confirmed/:token',
          element: <LegacyEmailConfirmRedirect path="/credits-email-confirmed/:token" />
        },
        {
          path: '/sign-in',
          element: <SignInPage />
        },
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          )
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ],
  { basename }
)
