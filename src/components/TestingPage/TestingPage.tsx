import React, { useCallback, useMemo, useState } from 'react'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { ListSubheader, SelectChangeEvent, Skeleton, useMediaQuery } from 'decentraland-ui2'
import { UserCreditsStatus } from '../../lib/api/credits'
import {
  Container,
  ContentWrapper,
  Header as CreditsHeader,
  InfoText,
  MarketplaceLink,
  OptOutButton,
  OptedOutDate,
  StatusCard,
  StatusLabel,
  StatusValue
} from '../CreditsSettings/CreditsSettings.styled'
import { Footer } from '../Footer'
import { Box, FooterContainer, PageContainer, Tab, TabPanelContainer, Tabs, TabsWrapper } from '../MainPage/MainPage.styled'
import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  ErrorMessage,
  ModalDescription,
  WarningIconContainer,
  WarningTitle
} from '../Modals/OptOutConfirmationModal/OptOutConfirmationModal.styled'
import { Navbar } from '../Navbar'
import { Title, Description as TypographyDescription } from '../Typography'
import {
  CategoryLabel,
  Description,
  FormControl,
  Header,
  MenuItem,
  PreviewContainer,
  PreviewLabel,
  Select,
  SelectorCard,
  SelectorLabel,
  WarningBanner,
  WarningText
} from './TestingPage.styled'
import { MockCreditsState, MockOptOutModalState, TestingView, TestingViewOption } from './TestingPage.types'

const CREDITS_INFO_URL =
  'https://decentraland.org/blog/announcements/marketplace-credits-earn-weekly-rewards-to-power-up-your-look?utm_org=dcl'

const viewOptions: TestingViewOption[] = [
  { value: TestingView.CREDITS_ENROLLED, label: 'Enrolled Status', category: 'Credits Settings' },
  { value: TestingView.CREDITS_OPTED_OUT, label: 'Left Status', category: 'Credits Settings' },
  { value: TestingView.CREDITS_NOT_REGISTERED, label: 'Not Registered Status', category: 'Credits Settings' },
  { value: TestingView.CREDITS_LOADING, label: 'Loading State', category: 'Credits Settings' },
  { value: TestingView.OPT_OUT_MODAL, label: 'Default State', category: 'Leave Modal' },
  { value: TestingView.OPT_OUT_MODAL_LOADING, label: 'Loading State', category: 'Leave Modal' },
  { value: TestingView.OPT_OUT_MODAL_ERROR, label: 'Generic Error', category: 'Leave Modal' },
  { value: TestingView.OPT_OUT_MODAL_ERROR_ALREADY_CLAIMED, label: 'Already Claimed Error', category: 'Leave Modal' }
]

const getMockCreditsState = (view: TestingView): MockCreditsState => {
  switch (view) {
    case TestingView.CREDITS_ENROLLED:
      return {
        status: UserCreditsStatus.ENROLLED,
        optedOutAt: null,
        isLoading: false,
        isOptingOut: false,
        error: null
      }
    case TestingView.CREDITS_OPTED_OUT:
      return {
        status: UserCreditsStatus.OPTED_OUT,
        optedOutAt: '2024-01-15T10:30:00Z',
        isLoading: false,
        isOptingOut: false,
        error: null
      }
    case TestingView.CREDITS_NOT_REGISTERED:
      return {
        status: UserCreditsStatus.NOT_REGISTERED,
        optedOutAt: null,
        isLoading: false,
        isOptingOut: false,
        error: null
      }
    case TestingView.CREDITS_LOADING:
      return {
        status: null,
        optedOutAt: null,
        isLoading: true,
        isOptingOut: false,
        error: null
      }
    default:
      return {
        status: UserCreditsStatus.ENROLLED,
        optedOutAt: null,
        isLoading: false,
        isOptingOut: false,
        error: null
      }
  }
}

const getMockOptOutModalState = (view: TestingView): MockOptOutModalState => {
  switch (view) {
    case TestingView.OPT_OUT_MODAL_LOADING:
      return { isLoading: true, error: null }
    case TestingView.OPT_OUT_MODAL_ERROR:
      return { isLoading: false, error: t('leave_confirmation_modal.errors.generic') }
    case TestingView.OPT_OUT_MODAL_ERROR_ALREADY_CLAIMED:
      return { isLoading: false, error: t('leave_confirmation_modal.errors.already_claimed') }
    default:
      return { isLoading: false, error: null }
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const CreditsSettingsPreview: React.FC<{ state: MockCreditsState }> = ({ state }) => {
  const { status, optedOutAt, isLoading, isOptingOut } = state

  const renderStatusContent = () => {
    if (isLoading) {
      return <Skeleton animation="wave" width={200} height={24} />
    }

    switch (status) {
      case UserCreditsStatus.ENROLLED:
        return (
          <>
            <StatusValue>
              <CardGiftcardRoundedIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
              {t('credits_settings.status.enrolled')}
            </StatusValue>
            <InfoText>{t('credits_settings.enrolled_info')}</InfoText>
            <OptOutButton variant="contained" disabled={isOptingOut}>
              {t('credits_settings.leave_button')}
            </OptOutButton>
          </>
        )

      case UserCreditsStatus.OPTED_OUT:
        return (
          <>
            <StatusValue>{t('credits_settings.status.left')}</StatusValue>
            {optedOutAt && <OptedOutDate>{t('credits_settings.left_date', { date: formatDate(optedOutAt) })}</OptedOutDate>}
            <InfoText>{t('credits_settings.rejoin_message')}</InfoText>
          </>
        )

      case UserCreditsStatus.NOT_REGISTERED:
        return (
          <>
            <StatusValue>{t('credits_settings.status.not_registered')}</StatusValue>
            <InfoText>
              {t('credits_settings.register_message')}{' '}
              <MarketplaceLink href={CREDITS_INFO_URL} target="_blank" rel="noopener noreferrer">
                {t('credits_settings.learn_more_link')}
              </MarketplaceLink>
            </InfoText>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Container>
      <CreditsHeader>
        <Title variant="h3">{t('credits_settings.title')}</Title>
        <TypographyDescription variant="subtitle1">{t('credits_settings.description')}</TypographyDescription>
      </CreditsHeader>

      <ContentWrapper>
        <StatusCard>
          <StatusLabel>{t('credits_settings.status_label')}</StatusLabel>
          {renderStatusContent()}
        </StatusCard>
      </ContentWrapper>
    </Container>
  )
}

const LeaveModalPreview: React.FC<{ state: MockOptOutModalState }> = ({ state }) => {
  const { isLoading, error } = state

  return (
    <div
      style={{
        backgroundColor: '#1a1a24',
        borderRadius: '12px',
        padding: '26px',
        maxWidth: '520px',
        border: '1px solid #ffffff17'
      }}
    >
      <WarningIconContainer>
        <WarningAmberRoundedIcon sx={{ fontSize: 48, color: '#FF2D55' }} />
      </WarningIconContainer>

      <WarningTitle>{t('leave_confirmation_modal.warning')}</WarningTitle>

      <ModalDescription>{t('leave_confirmation_modal.description')}</ModalDescription>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonContainer>
        <CancelButton variant="outlined" disabled={isLoading}>
          {t('leave_confirmation_modal.cancel')}
        </CancelButton>
        <ConfirmButton variant="contained" disabled={isLoading}>
          {isLoading ? 'Loading...' : t('leave_confirmation_modal.confirm')}
        </ConfirmButton>
      </ButtonContainer>
    </div>
  )
}

const TestingPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<TestingView>(TestingView.CREDITS_ENROLLED)
  const isTabletOrBelow = useMediaQuery('(max-width:991px)')

  const handleViewChange = useCallback((event: SelectChangeEvent<unknown>) => {
    setSelectedView(event.target.value as TestingView)
  }, [])

  const isCreditsSettingsView = useMemo(() => {
    return [
      TestingView.CREDITS_ENROLLED,
      TestingView.CREDITS_OPTED_OUT,
      TestingView.CREDITS_NOT_REGISTERED,
      TestingView.CREDITS_LOADING
    ].includes(selectedView)
  }, [selectedView])

  const creditsSettingsCategories = viewOptions.filter(opt => opt.category === 'Credits Settings')
  const leaveModalCategories = viewOptions.filter(opt => opt.category === 'Leave Modal')

  return (
    <PageContainer>
      <Navbar />

      <Box>
        <TabsWrapper>
          <Title variant="h1">Testing Page</Title>

          <Tabs orientation={isTabletOrBelow ? 'horizontal' : 'vertical'} value={0}>
            <Tab label="Component Testing" icon={<ScienceRoundedIcon />} iconPosition="start" />
          </Tabs>
        </TabsWrapper>

        <TabPanelContainer role="tabpanel">
          <Header>
            <Title variant="h3">Component Testing</Title>
            <Description>
              Use this page to test different component states and scenarios. Select a view from the dropdown to preview.
            </Description>
          </Header>

          <WarningBanner>
            <WarningAmberRoundedIcon sx={{ color: '#FF2D55' }} />
            <WarningText>This page is for development and testing purposes only.</WarningText>
          </WarningBanner>

          <SelectorCard>
            <SelectorLabel>Select View</SelectorLabel>
            <FormControl>
              <Select value={selectedView} onChange={handleViewChange} displayEmpty>
                <ListSubheader>
                  <CategoryLabel>Credits Settings</CategoryLabel>
                </ListSubheader>
                {creditsSettingsCategories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                <ListSubheader>
                  <CategoryLabel>Leave Modal</CategoryLabel>
                </ListSubheader>
                {leaveModalCategories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SelectorCard>

          <PreviewContainer>
            <PreviewLabel>Preview</PreviewLabel>
            {isCreditsSettingsView ? (
              <CreditsSettingsPreview state={getMockCreditsState(selectedView)} />
            ) : (
              <LeaveModalPreview state={getMockOptOutModalState(selectedView)} />
            )}
          </PreviewContainer>
        </TabPanelContainer>
      </Box>

      <FooterContainer>
        <Footer isFullscreen isFullWidth />
      </FooterContainer>
    </PageContainer>
  )
}

export default TestingPage
