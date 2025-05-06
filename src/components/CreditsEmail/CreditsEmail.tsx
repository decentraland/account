import Player from 'lottie-react'
import animationData from './animation.json'
import { AnimationWrapper, Card, Container, Description, Logo, Title } from './CreditsEmail.styled'

export default function CreditsEmail() {
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
