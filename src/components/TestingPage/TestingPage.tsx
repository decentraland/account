import React, { useCallback, useMemo, useState } from 'react'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
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
  ModalTitle,
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
  { value: TestingView.CREDITS_OPTED_OUT, label: 'Opted Out Status', category: 'Credits Settings' },
  { value: TestingView.CREDITS_NOT_REGISTERED, label: 'Not Registered Status', category: 'Credits Settings' },
  { value: TestingView.CREDITS_LOADING, label: 'Loading State', category: 'Credits Settings' },
  { value: TestingView.OPT_OUT_MODAL, label: 'Default State', category: 'Opt Out Modal' },
  { value: TestingView.OPT_OUT_MODAL_LOADING, label: 'Loading State', category: 'Opt Out Modal' },
  { value: TestingView.OPT_OUT_MODAL_ERROR, label: 'Error State', category: 'Opt Out Modal' }
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
      return { isLoading: false, error: 'Failed to opt out. Please try again later.' }
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
              You are currently enrolled in Marketplace Credits
            </StatusValue>
            <InfoText>Earn weekly rewards to power up your look by completing goals.</InfoText>
            <OptOutButton variant="contained" disabled={isOptingOut}>
              Opt Out
            </OptOutButton>
          </>
        )

      case UserCreditsStatus.OPTED_OUT:
        return (
          <>
            <StatusValue>You have opted out of Marketplace Credits</StatusValue>
            {optedOutAt && <OptedOutDate>You opted out on {formatDate(optedOutAt)}</OptedOutDate>}
            <InfoText>To opt back in, register again through the Explorer.</InfoText>
          </>
        )

      case UserCreditsStatus.NOT_REGISTERED:
        return (
          <>
            <StatusValue>You are not registered in Marketplace Credits</StatusValue>
            <InfoText>
              Earn weekly rewards to power up your look.{' '}
              <MarketplaceLink href={CREDITS_INFO_URL} target="_blank" rel="noopener noreferrer">
                Learn more
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
        <Title variant="h3">Marketplace Credits</Title>
        <TypographyDescription variant="subtitle1">Manage your enrollment in the Marketplace Credits program.</TypographyDescription>
      </CreditsHeader>

      <ContentWrapper>
        <StatusCard>
          <StatusLabel>Enrollment Status</StatusLabel>
          {renderStatusContent()}
        </StatusCard>
      </ContentWrapper>
    </Container>
  )
}

const OptOutModalPreview: React.FC<{ state: MockOptOutModalState }> = ({ state }) => {
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
      <ModalTitle sx={{ marginBottom: '16px' }}>Opt Out of Marketplace Credits</ModalTitle>

      <WarningIconContainer>
        <WarningAmberRoundedIcon sx={{ fontSize: 48, color: '#FF2D55' }} />
      </WarningIconContainer>

      <WarningTitle>Are you sure you want to opt out?</WarningTitle>

      <ModalDescription>
        You will no longer earn weekly rewards. You can opt back in at any time by registering again through the Explorer.
      </ModalDescription>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonContainer>
        <CancelButton variant="outlined" disabled={isLoading}>
          Cancel
        </CancelButton>
        <ConfirmButton variant="contained" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Confirm Opt Out'}
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
  const optOutModalCategories = viewOptions.filter(opt => opt.category === 'Opt Out Modal')

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
                  <CategoryLabel>Opt Out Modal</CategoryLabel>
                </ListSubheader>
                {optOutModalCategories.map(option => (
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
              <OptOutModalPreview state={getMockOptOutModalState(selectedView)} />
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
