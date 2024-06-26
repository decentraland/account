import styled from '@emotion/styled'
import {
  AccordionDetails as AccordionDetailsMui,
  Accordion as AccordionMui,
  AccordionSummary as AccordionSummaryMui,
  Switch as SwitchMui,
  Typography
} from 'decentraland-ui2'

export const Accordion = styled(AccordionMui)({
  backgroundColor: '#331636',
  marginBottom: '8px',
  borderRadius: '8px',
  ':last': {
    borderRadius: '8px'
  },
  '&.Mui-expanded': {
    marginTop: '8px',
    marginBottom: '8px'
  },
  '&::before': {
    display: 'none'
  }
})

export const AccordionSummary = styled(AccordionSummaryMui)({
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

export const AccordionSummaryContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '0',
  marginBottom: '0'
})

export const AccordionDetails = styled(AccordionDetailsMui)({ paddingLeft: 0, paddingRight: 0 })

export const NotificationItemContainer = styled('div')({
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

export const NotificationItemTextIconContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
})

export const NotificationItemText = styled(Typography)({
  color: '#fcfcfc99',
  fontSize: '14px',
  lineHeight: '16.94px',
  fontWeight: 500,
  marginLeft: '8px'
})

export const Switch = styled(SwitchMui)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
})
