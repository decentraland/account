import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Player from 'lottie-react'
import dclLogo from '../../images/icons/dcl.svg'
import animationData from '../CreditsEmail/animation.json'
import { AnimationWrapper, Card, Container, Description, Logo, Title } from '../CreditsEmail/CreditsEmail.styled'
import { Props } from './ConfirmPage.types'

const ConfirmPage: React.FC<Props> = props => {
  const { isLoading, address, onValidateSubscriptionEmailRequest } = props
  const { token } = useParams<{ token: string }>()

  useEffect(() => {
    !isLoading && onValidateSubscriptionEmailRequest({ address, code: token })
  }, [isLoading, token, address])

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
          Jump back over to the Decentraland app and start using your account!
        </Description>
      </Card>
    </Container>
  )
}

export default ConfirmPage
