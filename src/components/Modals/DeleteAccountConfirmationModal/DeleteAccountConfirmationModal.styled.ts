import styled from '@emotion/styled'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Button, IconButton, TextField, Typography } from 'decentraland-ui2'

export const CloseIconButton = styled(IconButton)({
  position: 'absolute',
  top: 10,
  right: 10,
  padding: '10px',
  backgroundColor: '#ffffff17',
  color: '#FCFCFC',
  '&:hover': {
    backgroundColor: '#ffffff30'
  }
})

export const WarningIcon = styled(WarningAmberRoundedIcon)({
  fontSize: 48,
  color: '#FF2D55'
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

export const ConfirmationLabel = styled(Typography)({
  fontSize: '13px',
  lineHeight: '20px',
  color: '#fcfcfc99',
  marginBottom: '8px'
})

export const ConfirmationInput = styled(TextField)({
  width: '100%',
  marginBottom: '20px',
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff0a',
    borderRadius: '8px',
    color: '#FCFCFC',
    fontSize: '14px'
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    textAlign: 'center',
    letterSpacing: '2px',
    fontWeight: 600
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff1a'
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff30'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF2D55'
  }
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
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center'
})

export const DeleteButton = styled(Button)({
  width: '100%',
  backgroundColor: '#FF2D55',
  '&:hover': {
    backgroundColor: '#e0264b'
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(255, 45, 85, 0.2)',
    color: 'rgba(255, 255, 255, 0.3)'
  }
})

export const CancelButton = styled(Button)({
  width: '100%'
})
