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

export const StatusCard = styled(Box)(({ theme }) => ({
  padding: '24px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`
}))

export const StatusLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
  marginBottom: '8px'
}))

export const StatusValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 500
}))

export const OptedOutDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
  marginTop: '4px'
}))

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
  marginTop: '16px'
}))

export const OptOutButton = styled(MuiButton)(({ theme }) => ({
  marginTop: '24px',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  }
}))

export const MarketplaceLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}))
