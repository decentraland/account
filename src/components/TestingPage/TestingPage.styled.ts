import styled from '@emotion/styled'
import { Box, FormControl as FormControlMui, MenuItem as MenuItemMui, Select as SelectMui, Typography } from 'decentraland-ui2'

export const Header = styled('div')({
  marginTop: '14px',
  marginBottom: '24px'
})

export const Description = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px'
})

export const SelectorCard = styled(Box)({
  backgroundColor: '#331636',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  maxWidth: '660px'
})

export const SelectorLabel = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '12px'
})

export const FormControl = styled(FormControlMui)({
  width: '100%',
  maxWidth: '400px'
})

export const Select = styled(SelectMui)({
  backgroundColor: '#280D2B',
  borderRadius: '4px',
  color: '#FCFCFC',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff80'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF2D55'
  },
  '& .MuiSelect-icon': {
    color: '#FCFCFC'
  }
})

export const MenuItem = styled(MenuItemMui)({
  '&.Mui-selected': {
    backgroundColor: '#FF2D5533'
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#FF2D5550'
  }
})

export const CategoryLabel = styled(Typography)({
  color: '#FF2D55',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '8px 16px',
  backgroundColor: '#280D2B'
})

export const PreviewContainer = styled(Box)({
  backgroundColor: '#280D2B80',
  borderRadius: '8px',
  padding: '24px',
  maxWidth: '660px'
})

export const PreviewLabel = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '16px',
  textTransform: 'uppercase'
})

export const WarningBanner = styled(Box)({
  backgroundColor: '#FF2D5520',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '24px',
  maxWidth: '660px',
  border: '1px solid #FF2D5550',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
})

export const WarningText = styled(Typography)({
  color: '#FF2D55',
  fontSize: '14px',
  fontWeight: 500
})
