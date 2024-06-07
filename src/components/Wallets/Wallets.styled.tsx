import styled from '@emotion/styled'
import { Typography as TypographyMui } from 'decentraland-ui2'
import { Description as DescriptionGlobal } from '../Typography'

export const Header = styled('div')({ marginTop: '14px' })

export const Description = styled(DescriptionGlobal)({ display: 'flex', alignItems: 'center' })

export const Address = styled(TypographyMui)({
  color: '#fcfcfc99',
  fontSize: '14px',
  lineHeight: '24px',
  fontWeight: 500,
  marginLeft: '8px',
  marginRight: '8px'
})
