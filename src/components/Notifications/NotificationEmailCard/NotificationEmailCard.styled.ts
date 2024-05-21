import styled from '@emotion/styled'
import { Button as ButtonMui, Card as CardMui, Switch as SwitchMui, TextField as TextFieldMui } from 'decentraland-ui2'

export const Card = styled(CardMui)({
  backgroundColor: '#331636',
  marginBottom: '8px',
  borderRadius: '8px',
  padding: '24px'
})

export const TitleContainer = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'start'
})

export const Switch = styled(SwitchMui)({ marginTop: '-10px' })

export const InputContainer = styled('div')({
  display: 'flex',
  width: '100%',
  marginTop: '8px'
})

export const TextField = styled(TextFieldMui)({
  flex: 3,
  marginRight: '8px',
  '& .MuiOutlinedInput-root': {
    fieldset: {
      borderColor: '#ffffff80'
    },
    '&:hover fieldset': {
      borderColor: '#fff'
    },
    '&:focus-within fieldset': {
      borderColor: '#fff'
    },
    '&.Mui-focused': {
      backgroundColor: '#280D2B'
    },
    '.MuiInputBase-input': {
      borderRadius: '4px',
      padding: '9px 15px',
      fontWeight: 600,
      fontSize: '15px',
      lineHeight: '24px',
      color: '#fcfcfc',
      '&:focus-within': {
        color: '#fcfcfc'
      },
      '&::placeholder': {
        color: '#ffffff80'
      }
    }
  }
})

export const Button = styled(ButtonMui)({
  flex: 1,
  maxHeight: '40px'
})

export const SpanUnconfirmedEmail = styled('span')<{
  confirmed?: boolean
  children?: React.ReactNode
}>(props => ({
  fontSize: '14px',
  lineHeight: '16.94px',
  marginLeft: '16px',
  fontWeight: props.confirmed ? 400 : 600,
  color: props.confirmed ? '#36D41D' : '#FF9EB1',
  textTransform: 'uppercase'
}))
