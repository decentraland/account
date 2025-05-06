import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 40%, #a259ff 0%, #3b006a 100%);
`

export const Logo = styled.img`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 48px;
  height: 48px;
`

export const Card = styled.div`
  background: #2d004d;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 576px;
  padding: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-width: 95vw;
    padding: 32px 8px;
    gap: 20px;
  }
`

export const AnimationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > div {
    width: 100%;
    max-width: 420px;
    height: auto;
  }

  @media (max-width: 600px) {
    & > div {
      max-width: 320px;
    }
  }
`

export const Title = styled.h2`
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 32px;
  }
`

export const Description = styled.p`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 0;
  line-height: 1.5;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`
