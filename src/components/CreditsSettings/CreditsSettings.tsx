import { useEffect } from 'react'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Skeleton, useMediaQuery } from 'decentraland-ui2'
import { UserCreditsStatus } from '../../lib/api/credits'
import { Description, Title } from '../Typography'
import {
  Container,
  ContentWrapper,
  Header,
  InfoText,
  MarketplaceLink,
  OptOutButton,
  OptedOutDate,
  StatusCard,
  StatusLabel,
  StatusValue
} from './CreditsSettings.styled'
import { Props } from './CreditsSettings.types'

const CREDITS_INFO_URL =
  'https://decentraland.org/blog/announcements/marketplace-credits-earn-weekly-rewards-to-power-up-your-look?utm_org=dcl'

const CreditsSettings: React.FC<Props> = props => {
  const { status, optedOutAt, isLoading, isOptingOut, onGetUserCreditsStatus, onOpenOptOutModal } = props
  const isTabletOrBelow = useMediaQuery('(max-width:991px)')

  useEffect(() => {
    onGetUserCreditsStatus()
  }, [onGetUserCreditsStatus])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
            <OptOutButton variant="contained" onClick={onOpenOptOutModal} disabled={isOptingOut}>
              {t('credits_settings.opt_out_button')}
            </OptOutButton>
          </>
        )

      case UserCreditsStatus.OPTED_OUT:
        return (
          <>
            <StatusValue>{t('credits_settings.status.opted_out')}</StatusValue>
            {optedOutAt && <OptedOutDate>{t('credits_settings.opted_out_date', { date: formatDate(optedOutAt) })}</OptedOutDate>}
            <InfoText>{t('credits_settings.opt_in_message')}</InfoText>
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
      {!isTabletOrBelow && (
        <Header>
          <Title variant="h3">{t('credits_settings.title')}</Title>
          <Description variant="subtitle1">{t('credits_settings.description')}</Description>
        </Header>
      )}

      <ContentWrapper>
        <StatusCard>
          <StatusLabel>{t('credits_settings.status_label')}</StatusLabel>
          {renderStatusContent()}
        </StatusCard>
      </ContentWrapper>
    </Container>
  )
}

export default CreditsSettings
