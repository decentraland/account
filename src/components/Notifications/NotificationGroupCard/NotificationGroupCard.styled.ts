import styled from '@emotion/styled'
import { Accordion, AccordionDetails, AccordionSummary, Switch, Typography } from 'decentraland-ui2'

export const AccordionStyled = styled(Accordion)({
  backgroundColor: '#331636',
  marginBottom: '8px',
  borderRadius: '8px',
  ':last': {
    borderRadius: '8px'
  },
  '&.Mui-expanded': {
    marginTop: '8px',
    marginBottom: '8px'
  }
})

export const AccordionTitleStyled = styled(Typography)({
  color: '#FCFCFC',
  fontSize: '16px',
  lineHeight: '19.36px',
  fontWeight: 600,
  marginBottom: '8px'
})

export const AccordionDescriptionStyled = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '12px',
  lineHeight: '24px',
  fontWeight: 500
})

export const AccordionSummaryStyled = styled(AccordionSummary)({
  paddingLeft: '24px',
  paddingRight: '24px',
  paddingTop: '24px',
  paddingBottom: '12px',
  display: 'flex',
  alignItems: 'flex-start',
  '.MuiAccordionSummary-content.Mui-expanded': {
    margin: '0'
  },
  '.MuiAccordionSummary-content': {
    margin: '0'
  }
})

export const AccordionSummaryContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '0',
  marginBottom: '0'
})

export const AccordionDetailsStyled = styled(AccordionDetails)({ paddingLeft: 0, paddingRight: 0 })

export const NotificationItemContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#280d2bbf',
  borderBottom: '1px solid #331636',
  paddingLeft: '24px',
  paddingRight: '16px',
  height: '44px'
})

export const NotificationItemTextIconContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
})

export const NotificationItemTextStyled = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  lineHeight: '16.94px',
  fontWeight: 500,
  marginLeft: '8px'
})

export const SwitchStyled = styled(Switch)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
})
