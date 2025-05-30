import { useCallback, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Turnstile } from '@marsidev/react-turnstile'
import Player from 'lottie-react'
import { config } from '../../config'
import dclLogo from '../../images/icons/dcl.svg'
import animationData from '../CreditsEmail/animation.json'
import {
  AnimationWrapper,
  ButtonContainer,
  Card,
  ConfirmButton,
  Container,
  Description,
  Logo,
  Title,
  TurnstileContainer
} from './UnifiedEmailConfirmation.styled'
import { EmailConfirmationSource, Props } from './UnifiedEmailConfirmation.types'

const UnifiedEmailConfirmation: React.FC<Props> = props => {
  const { isLoading, onConfirmEmail } = props
  const { token } = useParams<{ token: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // Determine source from URL parameters or route
  let source = searchParams.get('source') as EmailConfirmationSource
  // Always get address from query parameters since route is unprotected
  const address = searchParams.get('address')

  // For backward compatibility, detect source from the current path
  if (!source) {
    if (location.pathname.startsWith('/credits-email-confirmed/')) {
      source = 'credits'
    } else if (location.pathname.startsWith('/confirm-email/')) {
      source = 'account'
    }
  }

  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const siteKey = config.get('REACT_APP_CLOUDFLARE_TURNSTILE_SITE_KEY') || '1x00000000000000000000AA'
  const isTestKey = siteKey === '1x00000000000000000000AA'

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token)
    // Ensure loaded state is set for both test and real keys
    setIsTurnstileLoaded(true)
  }, [])

  const handleTurnstileLoad = useCallback(() => {
    setIsTurnstileLoaded(true)
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('')
    setIsTurnstileLoaded(false)
  }, [])

  const handleConfirmEmail = useCallback(() => {
    if (!address || !token || !source || !turnstileToken) {
      return
    }

    onConfirmEmail(address, token, source, turnstileToken)
    setIsConfirmed(true)
  }, [address, token, source, turnstileToken, onConfirmEmail])

  const handleRedirect = useCallback(() => {
    if (source === 'credits') {
      window.location.href = config.get('MARKETPLACE_URL')
    } else {
      window.location.href = config.get('ACCOUNT_URL')
    }
  }, [source])

  const getTitle = () => {
    if (isConfirmed) {
      return 'Email Confirmed!'
    }
    return 'Confirm Your Email'
  }

  const getDescription = () => {
    if (isConfirmed) {
      if (source === 'credits') {
        return (
          <>
            You're ready to go.
            <br />
            Jump back over to the Decentraland app and start earning <b>Marketplace Credits!</b>
          </>
        )
      }

      return (
        <>
          You're ready to go.
          <br />
          Jump back over to the Decentraland app and start using your account!
        </>
      )
    }

    if (source === 'credits') {
      return (
        <>
          Complete the security challenge below and click "Confirm Email" to start earning <b>Marketplace Credits!</b>
        </>
      )
    }

    return <>Complete the security challenge below and click "Confirm Email" to activate your account notifications.</>
  }

  // Validate required parameters
  if (!token) {
    return (
      <Container>
        <Logo src={dclLogo} alt="Logo" />
        <Card>
          <Title>Invalid Link</Title>
          <Description>This confirmation link is invalid or expired.</Description>
        </Card>
      </Container>
    )
  }

  if (!source || !['account', 'credits'].includes(source)) {
    return (
      <Container>
        <Logo src={dclLogo} alt="Logo" />
        <Card>
          <Title>Invalid Source</Title>
          <Description>Invalid confirmation source. Please check your email link.</Description>
        </Card>
      </Container>
    )
  }

  if (!address) {
    return (
      <Container>
        <Logo src={dclLogo} alt="Logo" />
        <Card>
          <Title>Missing Address</Title>
          <Description>Address parameter is required in the URL. Please check your email link.</Description>
        </Card>
      </Container>
    )
  }

  // More lenient button disabled logic for test environment
  const isButtonDisabled = isLoading || !turnstileToken || (!isTurnstileLoaded && !isTestKey)

  return (
    <Container>
      <Logo src={dclLogo} alt="Logo" />
      <Card>
        {/* Only show animation when email is confirmed and source is credits */}
        {isConfirmed && source === 'credits' && (
          <AnimationWrapper>
            <Player autoplay loop animationData={animationData} style={{ width: 420, height: 300 }} />
          </AnimationWrapper>
        )}
        <Title>{getTitle()}</Title>
        <Description>{getDescription()}</Description>

        {!isConfirmed && (
          <>
            <TurnstileContainer>
              <Turnstile
                siteKey={siteKey}
                onSuccess={handleTurnstileSuccess}
                onError={handleTurnstileError}
                onLoad={handleTurnstileLoad}
                options={{
                  theme: 'dark',
                  size: 'normal',
                  retry: 'auto'
                }}
              />
            </TurnstileContainer>

            <ButtonContainer>
              <ConfirmButton disabled={isButtonDisabled} onClick={handleConfirmEmail}>
                {isLoading ? 'Confirming...' : 'Confirm Email'}
              </ConfirmButton>
            </ButtonContainer>
          </>
        )}

        {isConfirmed && (
          <ButtonContainer>
            <ConfirmButton onClick={handleRedirect}>{source === 'credits' ? 'Go to Marketplace' : 'Go back to Account'}</ConfirmButton>
          </ButtonContainer>
        )}
      </Card>
    </Container>
  )
}

export default UnifiedEmailConfirmation
