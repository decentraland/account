import styled from '@emotion/styled'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Box, Button, Typography } from 'decentraland-ui2'

export const Container = styled('div')({
  maxWidth: '660px'
})

export const Header = styled('div')({
  marginTop: '14px'
})

export const ContentWrapper = styled('div')({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})

export const DangerBanner = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 45, 85, 0.1)',
  border: '1px solid rgba(255, 45, 85, 0.3)'
})

export const DangerBannerIcon = styled(ErrorOutlineRoundedIcon)({
  fontSize: 24,
  color: '#FF2D55',
  flexShrink: 0
})

export const DangerBannerTextWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
})

export const DangerBannerTitle = styled(Typography)({
  color: '#FF2D55',
  fontSize: '15px',
  fontWeight: 700,
  lineHeight: '22px'
})

export const DangerBannerDescription = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '13px',
  lineHeight: '20px'
})

export const WarningCard = styled(Box)({
  padding: '24px',
  borderRadius: '8px',
  backgroundColor: '#331636'
})

export const WarningDescription = styled(Typography)({
  color: '#FCFCFC',
  fontSize: '15px',
  fontWeight: 600,
  marginBottom: '16px',
  lineHeight: '24px'
})

export const ConsequencesList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0
})

export const ConsequenceItem = styled('li')({
  display: 'flex',
  gap: '10px',
  marginBottom: '12px',
  color: '#fcfcfc99',
  fontSize: '14px',
  lineHeight: '22px',
  alignItems: 'flex-start',
  '&:last-child': {
    marginBottom: 0
  }
})

export const ConsequenceIcon = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginTop: '1px',
  color: '#fcfcfc66',
  '& .MuiSvgIcon-root': {
    fontSize: 18
  }
})

export const ConsequenceTitle = styled('span')({
  color: '#FCFCFC',
  fontWeight: 600
})

export const AssetWarningBox = styled(Box)({
  display: 'flex',
  gap: '12px',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 165, 0, 0.08)',
  border: '1px solid rgba(255, 165, 0, 0.3)',
  alignItems: 'flex-start'
})

export const AssetWarningIcon = styled(WarningAmberRoundedIcon)({
  fontSize: 22,
  color: '#FFA500',
  flexShrink: 0,
  marginTop: '1px'
})

export const AssetWarningTextWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

export const AssetWarningTitle = styled(Typography)({
  color: '#FFA500',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '20px'
})

export const AssetWarningDescription = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '13px',
  lineHeight: '20px'
})

export const ExportKeyDescription = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '13px',
  lineHeight: '20px',
  marginTop: '4px'
})

export const ExportKeyLink = styled(Button)({
  color: '#FFA500',
  fontSize: '13px',
  fontWeight: 600,
  marginTop: '4px',
  padding: 0,
  minWidth: 'auto',
  textTransform: 'none',
  justifyContent: 'flex-start',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'transparent'
  }
})

export const DeleteButton = styled(Button)({
  marginTop: '24px',
  backgroundColor: '#FF2D55',
  '&:hover': {
    backgroundColor: '#e0264b'
  }
})
