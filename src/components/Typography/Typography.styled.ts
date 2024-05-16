import styled from '@emotion/styled'
import { Typography } from 'decentraland-ui2'

export const Title = styled(Typography)(props => {
  let fontSize: string
  switch (props.variant) {
    case 'h1':
      fontSize = '30px'
      break
    case 'h2':
      fontSize = '26px'
      break
    case 'h3':
      fontSize = '22px'
      break
    case 'h4':
      fontSize = '20px'
      break
    case 'h5':
      fontSize = '18px'
      break
    case 'h6':
      fontSize = '16px'
      break
    default:
      fontSize = '10px'
      break
  }
  return {
    color: '#FCFCFC',
    fontSize,
    lineHeight: '19.36px',
    fontWeight: 600,
    marginBottom: '8px'
  }
})

export const Description = styled(Typography)(props => {
  let fontSize: string
  switch (props.variant) {
    case 'subtitle1':
      fontSize = '14px'
      break
    default:
      fontSize = '12px'
      break
  }
  return {
    color: '#fcfcfc99',
    fontSize,
    lineHeight: '24px',
    fontWeight: 500
  }
})
