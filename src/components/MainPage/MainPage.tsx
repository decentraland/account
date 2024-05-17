import React, { useState } from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Skeleton, useMediaQuery } from 'decentraland-ui2'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { Notifications } from '../Notifications'
import { Title } from '../Typography'
import { Wallets } from '../Wallets'
import { Box, PageContainer, Tab, TabPanelContainer, Tabs, TabsWrapper } from './MainPage.styled'
import { Props } from './MainPage.types'

// eslint-disable-next-line css-import-order/css-import-order
import 'decentraland-ui/dist/themes/alternative/dark-theme.css'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <TabPanelContainer role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`}>
      {value === index && children}
    </TabPanelContainer>
  )
}

const MainPage: React.FC<Props> = props => {
  const { isLoading } = props
  const [value, setValue] = useState(0)
  const isTabletOrBelow = useMediaQuery('(max-width:991px)')

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
          </Tabs>
        </TabsWrapper>

        <TabPanel value={value} index={0}>
          <Wallets></Wallets>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Notifications isLoading={false} />
        </TabPanel>
      </Box>

      <Footer />
    </PageContainer>
  )
}

export default React.memo(MainPage)
