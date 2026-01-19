import styled from '@emotion/styled'
import { Box, Button, Typography } from 'decentraland-ui2'

export const Container = styled('div')({
  maxWidth: '660px'
})

export const Header = styled('div')({
  marginTop: '14px'
})

export const ContentWrapper = styled('div')({
  marginTop: '16px'
})

export const StatusCard = styled(Box)({
  padding: '24px',
  borderRadius: '8px',
  backgroundColor: '#331636'
})

export const StatusLabel = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '8px'
})

export const StatusValue = styled(Typography)({
  color: '#FCFCFC',
  fontSize: '16px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center'
})

export const OptedOutDate = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  fontWeight: 500,
  marginTop: '4px'
})

export const InfoText = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  fontWeight: 500,
  marginTop: '16px',
  lineHeight: '24px'
})

export const OptOutButton = styled(Button)({
  marginTop: '24px'
})

export const MarketplaceLink = styled('a')({
  color: '#FF2D55',
  textDecoration: 'none',
  fontWeight: 600,
  '&:hover': {
    textDecoration: 'underline'
  }
})

export const JumpInWrapper = styled('div')({
  marginTop: '24px',
  display: 'inline-block'
})
