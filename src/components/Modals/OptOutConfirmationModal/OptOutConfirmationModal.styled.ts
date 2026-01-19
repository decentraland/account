import styled from '@emotion/styled'
import { Button as MuiButton, Typography } from 'decentraland-ui2'

export const ModalTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '21px',
  lineHeight: '30px',
  textAlign: 'center',
  letterSpacing: '0.3px',
  color: '#FCFCFC'
})

export const WarningIconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px'
})

export const WarningTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '17px',
  lineHeight: '26px',
  textAlign: 'center',
  marginBottom: '16px',
  color: '#FCFCFC'
})

export const ModalDescription = styled(Typography)({
  fontSize: '15px',
  lineHeight: '24px',
  color: '#736e7d',
  textAlign: 'center',
  marginBottom: '24px'
})

export const ErrorMessage = styled('div')({
  backgroundColor: 'rgba(255, 45, 85, 0.1)',
  border: '1px solid #FF2D55',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '16px',
  color: '#FF2D55',
  fontSize: '14px',
  textAlign: 'center'
})

export const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center'
})

export const CancelButton = styled(MuiButton)({
  minWidth: '140px',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '24px',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  border: '1px solid #736e7d',
  color: '#FCFCFC',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#ffffff17',
    borderColor: '#FCFCFC'
  },
  '&:disabled': {
    color: '#FCFCFC80',
    borderColor: '#736e7d80'
  }
})

export const ConfirmButton = styled(MuiButton)({
  minWidth: '140px',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '24px',
  borderRadius: '4px',
  backgroundColor: '#FF2D55',
  color: '#FFFFFF',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#D91A40'
  },
  '&:disabled': {
    backgroundColor: '#FF2D5580',
    color: '#FFFFFF80'
  }
})
