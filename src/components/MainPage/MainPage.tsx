import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ProviderType } from '@dcl/schemas'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Alert, Skeleton, Snackbar, useMediaQuery } from 'decentraland-ui2'
import { CreditsSettings } from '../CreditsSettings'
import { DeleteAccount } from '../DeleteAccount'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { Notifications } from '../Notifications'
import { Title } from '../Typography'
import { Wallets } from '../Wallets'
import { Box, DeleteTab, FooterContainer, PageContainer, Tab, TabPanelContainer, Tabs, TabsWrapper } from './MainPage.styled'
import { Props } from './MainPage.types'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

enum TabIndex {
  WALLETS = 0,
  NOTIFICATIONS = 1,
  CREDITS = 2,
  DELETE_ACCOUNT = 3
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
  const { isLoading, providerType, notificationSettingError, onClearChangeNotificationSettingError } = props
  const isThirdweb = providerType === ProviderType.THIRDWEB
  const location = useLocation<{ defaultTab?: number }>()
  const [value, setValue] = useState(location.state?.defaultTab ? location.state.defaultTab : 0)
  const isTabletOrBelow = useMediaQuery('(max-width:991px)')

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // Reset to Wallets tab if the Delete Account tab disappears (e.g. provider change)
  useEffect(() => {
    if (!isThirdweb && value === TabIndex.DELETE_ACCOUNT) {
      setValue(TabIndex.WALLETS)
    }
  }, [isThirdweb, value])

  const handleGoToWallets = useCallback(() => {
    setValue(TabIndex.WALLETS)
  }, [])

  const handleClose = useCallback(() => {
    onClearChangeNotificationSettingError()
  }, [onClearChangeNotificationSettingError])

  return (
    <PageContainer>
      <Navbar />

      <Box>
        <TabsWrapper>
          {isLoading ? <Skeleton animation="wave" width={100} height={20} /> : <Title variant="h1">{t('main_page.title')}</Title>}

          <Tabs
            orientation={isTabletOrBelow ? 'horizontal' : 'vertical'}
            variant={isTabletOrBelow ? 'scrollable' : 'standard'}
            scrollButtons={false}
            value={value}
            onChange={handleChange}
          >
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
            {isThirdweb && (
              <DeleteTab
                label={isLoading ? <Skeleton animation="wave" width={100} height={20} /> : t('main_page.delete_account')}
                icon={<DeleteForeverRoundedIcon />}
                iconPosition="start"
              />
            )}
          </Tabs>
        </TabsWrapper>

        <TabPanel value={value} index={TabIndex.WALLETS}>
          <Wallets></Wallets>
        </TabPanel>
        <TabPanel value={value} index={TabIndex.NOTIFICATIONS}>
          <Notifications isLoading={false} />
        </TabPanel>
        <TabPanel value={value} index={TabIndex.CREDITS}>
          <CreditsSettings />
        </TabPanel>
        {isThirdweb && (
          <TabPanel value={value} index={TabIndex.DELETE_ACCOUNT}>
            <DeleteAccount onGoToWallets={handleGoToWallets} />
          </TabPanel>
        )}
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
