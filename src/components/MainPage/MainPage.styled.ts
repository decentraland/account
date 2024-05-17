import styled from '@emotion/styled'
import { Box as BoxMui, Tab as TabMui, Tabs as TabsMui } from 'decentraland-ui2'
import background from '../../images/background.webp'

export const PageContainer = styled('div')({
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100vw',
  minHeight: '100vh',
  position: 'relative'
})

export const Box = styled(BoxMui)({
  flexGrow: 1,
  display: 'flex',
  '@media (max-width: 991px)': { flexDirection: 'column', alignItems: 'center' }
})

export const TabPanelContainer = styled('div')({
  marginTop: '8px',
  padding: 0,
  '@media (max-width: 991px)': { padding: '0 16px' }
})

export const TabsWrapper = styled('div')({
  maxWidth: '390px',
  padding: '26px 48px',
  '@media (max-width: 991px)': { maxWidth: '100%' }
})

export const Tabs = styled(TabsMui)({
  marginTop: '16px',
  padding: 0,
  justifyContent: 'flex-start',
  '& .MuiTabs-indicator': {
    display: 'none'
  }
})

export const Tab = styled(TabMui)({
  justifyContent: 'flex-start',
  color: '#CFCDD4',
  '&.MuiButtonBase-root.MuiTab-root': {
    maxHeight: '40px',
    minHeight: '40px',
    height: '40px',
    marginBottom: '8px'
  },
  '&.Mui-selected': {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    color: '#161518'
  }
})
