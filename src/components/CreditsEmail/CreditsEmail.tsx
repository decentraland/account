import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Player from 'lottie-react'
import animationData from './animation.json'
import { AnimationWrapper, Card, Container, Description, Logo, Title } from './CreditsEmail.styled'
import { Props } from './CreditsEmail.types'

const CreditsEmail: React.FC<Props> = props => {
  const { onValidateCreditsEmailRequest } = props
  const { token } = useParams<{ token: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const address = searchParams.get('address')

  useEffect(() => {
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

  return (
    <Container>
      <Logo src="/favicon.ico" alt="Logo" />
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
      </Card>
    </Container>
  )
}

export default CreditsEmail
