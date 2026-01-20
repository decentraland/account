import React, { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Alert, Skeleton, Snackbar, useMediaQuery } from 'decentraland-ui2'
import { CreditsSettings } from '../CreditsSettings'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { Notifications } from '../Notifications'
import { Title } from '../Typography'
import { Wallets } from '../Wallets'
import { Box, FooterContainer, PageContainer, Tab, TabPanelContainer, Tabs, TabsWrapper } from './MainPage.styled'
import { Props } from './MainPage.types'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <TabPanelContainer role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </TabPanelContainer>
  )
}

const MainPage: React.FC<Props> = props => {
  const { isLoading, notificationSettingError, onClearChangeNotificationSettingError } = props
  const location = useLocation<{ defaultTab?: number }>()
  const [value, setValue] = useState(location.state?.defaultTab ? location.state.defaultTab : 0)
  const isTabletOrBelow = useMediaQuery('(max-width:991px)')

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleClose = useCallback(() => {
    onClearChangeNotificationSettingError()
  }, [])

  return (
    <PageContainer>
      <Navbar />

      <Box>
        <TabsWrapper>
          {isLoading ? <Skeleton animation="wave" width={100} height={20} /> : <Title variant="h1">{t('main_page.title')}</Title>}

          <Tabs orientation={isTabletOrBelow ? 'horizontal' : 'vertical'} value={value} onChange={handleChange}>
            <Tab
              label={isLoading ? <Skeleton animation="wave" width={100} height={20} /> : t('main_page.wallets')}
              icon={<AccountBalanceWalletRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              label={isLoading ? <Skeleton animation="wave" width={100} height={20} /> : t('main_page.email_notifications')}
              icon={<MarkEmailUnreadRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              label={isLoading ? <Skeleton animation="wave" width={100} height={20} /> : t('main_page.credits_settings')}
              icon={<CardGiftcardRoundedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </TabsWrapper>

        <TabPanel value={value} index={0}>
          <Wallets></Wallets>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Notifications isLoading={false} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CreditsSettings />
        </TabPanel>
      </Box>
      <FooterContainer>
        <Footer isFullscreen isFullWidth />
      </FooterContainer>

      <Snackbar open={!!notificationSettingError} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity="error" variant="filled">
          {notificationSettingError}
        </Alert>
      </Snackbar>
    </PageContainer>
  )
}

export default React.memo(MainPage)
