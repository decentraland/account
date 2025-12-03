import { useCallback, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Player from 'lottie-react'
import dclLogo from '../../images/icons/dcl.svg'
import animationData from './animation.json'
import { AnimationWrapper, Card, Container, Description, Logo, Title } from './CreditsEmail.styled'
import { Props } from './CreditsEmail.types'

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: any) => void
      reset: () => void
    }
  }
}

const CreditsEmail: React.FC<Props> = props => {
  const { onValidateCreditsEmailRequest } = props
  const { token } = useParams<{ token: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const address = searchParams.get('address')

  const handleValidateEmail = useCallback(() => {
    if (!address) {
      console.error('Address is required in query parameters')
      return
    }
    if (!token) {
      console.error('Token is required in URL parameters')
      return
    }
    if (typeof onValidateCreditsEmailRequest === 'function') {
      onValidateCreditsEmailRequest({ address, code: token })
    } else {
      console.error('onValidateCreditsEmailRequest is not available')
    }
  }, [token, address, onValidateCreditsEmailRequest])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      handleValidateEmail()
    },
    [handleValidateEmail]
  )

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <Container>
      <Logo src={dclLogo} alt="Logo" />
      <Card>
        <AnimationWrapper>
          <Player autoplay loop animationData={animationData} style={{ width: 420, height: 300 }} />
        </AnimationWrapper>
        <Title>Email Confirmed!</Title>
        <Description>
          You're ready to go.
          <br />
          Jump back over to the Decentraland app and start earning <b>Marketplace Credits!</b>
        </Description>
        <form onSubmit={handleSubmit}>
          <div className="cf-turnstile" data-sitekey={process.env.REACT_APP_TURNSTILE_SITE_KEY}></div>
          <button type="submit" style={{ marginTop: '20px' }}>
            Continue
          </button>
        </form>
      </Card>
    </Container>
  )
}

export default CreditsEmail
