import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'
import { getIsTurnstileVerificationEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'
import { ConfirmPage } from '../ConfirmPage'
import CreditsEmail from '../CreditsEmail/CreditsEmail.container'
import { Props } from './LegacyEmailConfirmRedirect.types'

const LegacyEmailConfirmRedirect: React.FC<Props> = ({ path }) => {
  const isTurnstileEnabled = useSelector((state: RootState) => getIsTurnstileVerificationEnabled(state))
  const location = useLocation()

  if (isTurnstileEnabled) {
    const token = location.pathname.split('/').pop()
    const newPath = `/confirm-email-challenge/${token}${location.search}`

    return <Redirect to={newPath} />
  }

  if (path === '/confirm-email/:token') {
    return <ConfirmPage />
  } else {
    return <CreditsEmail />
  }
}

export default LegacyEmailConfirmRedirect
