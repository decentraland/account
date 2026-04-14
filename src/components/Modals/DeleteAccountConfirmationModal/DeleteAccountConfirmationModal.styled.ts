import styled from '@emotion/styled'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
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

export const WarningIcon = styled(WarningRoundedIcon)({
  fontSize: 40,
  color: '#FCFCFC'
})

export const WarningIconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px'
})

export const WarningIconCircle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: '#FF2D55'
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
  color: '#CFCDD4',
  textAlign: 'left',
  marginBottom: '24px'
})

export const ConfirmationInput = styled(TextField)({
  width: '100%',
  marginBottom: '20px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff30'
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff50'
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
  flexDirection: 'row',
  gap: '12px'
})

export const CancelButton = styled(Button)({
  flex: 1
})

export const DeleteButton = styled(Button)({
  flex: 1
})
