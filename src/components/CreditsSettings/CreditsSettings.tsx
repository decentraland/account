import { useEffect } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { JumpIn, Skeleton, useTabletAndBelowMediaQuery } from 'decentraland-ui2'
import { UserCreditsStatus } from '../../lib/api/credits'
import { Title } from '../Typography'
import {
  Container,
  ContentWrapper,
  Header,
  InfoText,
  JumpInWrapper,
  MarketplaceLink,
  OptOutButton,
  StatusCard,
  StatusLabel
} from './CreditsSettings.styled'
import { Props } from './CreditsSettings.types'

const CREDITS_INFO_URL =
  'https://decentraland.org/blog/announcements/marketplace-credits-earn-weekly-rewards-to-power-up-your-look?utm_org=dcl'

const CreditsSettings: React.FC<Props> = props => {
  const { status, isLoading, isOptingOut, onGetUserCreditsStatus, onOpenOptOutModal } = props
  const isTabletOrBelow = useTabletAndBelowMediaQuery()

  useEffect(() => {
    onGetUserCreditsStatus()
  }, [onGetUserCreditsStatus])

  const getStatusKey = () => {
    switch (status) {
      case UserCreditsStatus.ENROLLED:
        return 'enrolled'
      case UserCreditsStatus.OPTED_OUT:
        return 'left'
      case UserCreditsStatus.NOT_REGISTERED:
        return 'not_registered'
      default:
        return ''
    }
  }

  const renderStatusContent = () => {
    if (isLoading) {
      return <Skeleton animation="wave" width={200} height={24} />
    }

    switch (status) {
      case UserCreditsStatus.ENROLLED:
        return (
          <>
            <InfoText>{t('credits_settings.enrolled_info')}</InfoText>
            <OptOutButton variant="contained" onClick={onOpenOptOutModal} disabled={isOptingOut}>
              {t('credits_settings.leave_button')}
            </OptOutButton>
          </>
        )

      case UserCreditsStatus.OPTED_OUT:
        return (
          <>
            <InfoText>{t('credits_settings.rejoin_message')}</InfoText>
            <JumpInWrapper>
              <JumpIn
                variant="button"
                hideIcon
                buttonText={t('credits_settings.rejoin_button')}
                buttonProps={{ variant: 'contained' }}
                modalProps={{
                  title: t('credits_settings.title'),
                  description: t('credits_settings.rejoin_message'),
                  buttonLabel: t('credits_settings.rejoin_button')
                }}
              />
            </JumpInWrapper>
          </>
        )

      case UserCreditsStatus.NOT_REGISTERED:
        return (
          <>
            <InfoText>
              {t('credits_settings.register_message')}{' '}
              <MarketplaceLink href={CREDITS_INFO_URL} target="_blank" rel="noopener noreferrer">
                {t('credits_settings.learn_more_link')}
              </MarketplaceLink>
            </InfoText>
            <JumpInWrapper>
              <JumpIn
                variant="button"
                hideIcon
                buttonText={t('credits_settings.join_button')}
                buttonProps={{ variant: 'contained' }}
                modalProps={{
                  title: t('credits_settings.title'),
                  description: t('credits_settings.register_message'),
                  buttonLabel: t('credits_settings.join_button')
                }}
              />
            </JumpInWrapper>
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
        </Header>
      )}

      <ContentWrapper>
        <StatusCard>
          <StatusLabel>
            {isLoading ? (
              <Skeleton animation="wave" width={120} height={20} />
            ) : (
              t('credits_settings.status_label', { status: t(`credits_settings.status.${getStatusKey()}`) })
            )}
          </StatusLabel>
          {renderStatusContent()}
        </StatusCard>
      </ContentWrapper>
    </Container>
  )
}

export default CreditsSettings
