import styled from '@emotion/styled'
import { Box, Button as MuiButton, Typography } from 'decentraland-ui2'

export const Container = styled('div')({
  maxWidth: '660px'
})

export const Header = styled('div')({
  marginTop: '14px'
})

export const ContentWrapper = styled('div')({
  marginTop: '24px'
})

export const StatusCard = styled(Box)({
  padding: '24px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
})

export const StatusLabel = styled(Typography)({
  color: '#CFCDD4',
  fontSize: '14px',
  marginBottom: '8px'
})

export const StatusValue = styled(Typography)({
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 500
})

export const OptedOutDate = styled(Typography)({
  color: '#CFCDD4',
  fontSize: '14px',
  marginTop: '4px'
})

export const InfoText = styled(Typography)({
  color: '#CFCDD4',
  fontSize: '14px',
  marginTop: '16px'
})

export const OptOutButton = styled(MuiButton)({
  marginTop: '24px',
  backgroundColor: '#FF2D55',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#D91A40'
  }
})

export const MarketplaceLink = styled('a')({
  color: '#FF2D55',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
})
