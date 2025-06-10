import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 40%, #a326d5 0%, #691fa9 100%);

  @media (max-width: 600px) {
    background: #350f44;
  }
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
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    padding: 24px;
    max-width: 100vw;
    gap: 20px;
  }
`

export const AnimationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

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
  margin: 0;
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
    max-width: 328px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const TurnstileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  min-height: 65px;
  width: 100%;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
`

export const ConfirmButton = styled.button<{ disabled?: boolean }>`
  background-color: ${props => (props.disabled ? '#666' : '#ff2d55')};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  min-width: 160px;

  &:hover {
    background-color: ${props => (props.disabled ? '#666' : '#ff1a45')};
    transform: ${props => (props.disabled ? 'none' : 'translateY(-1px)')};
  }

  &:active {
    transform: ${props => (props.disabled ? 'none' : 'translateY(0)')};
  }

  @media (max-width: 600px) {
    padding: 14px 28px;
    font-size: 14px;
    min-width: 140px;
  }
`
