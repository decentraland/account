import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { useTabletAndBelowMediaQuery } from 'decentraland-ui2'
import { Title } from '../Typography'
import {
  AssetWarningBox,
  AssetWarningDescription,
  AssetWarningIcon,
  AssetWarningTextWrapper,
  AssetWarningTitle,
  ConsequenceIcon,
  ConsequenceItem,
  ConsequenceTitle,
  ConsequencesList,
  Container,
  ContentWrapper,
  DangerBanner,
  DangerBannerDescription,
  DangerBannerIcon,
  DangerBannerTextWrapper,
  DangerBannerTitle,
  DeleteButton,
  ExportKeyDescription,
  ExportKeyLink,
  Header,
  WarningCard,
  WarningDescription
} from './DeleteAccount.styled'
import { Props } from './DeleteAccount.types'

const CONSEQUENCES = [
  { key: 'profile', icon: AccountCircleRoundedIcon },
  { key: 'social', icon: GroupRoundedIcon },
  { key: 'marketplace', icon: StorefrontRoundedIcon },
  { key: 'credits', icon: CardGiftcardRoundedIcon },
  { key: 'favorites', icon: PlaceRoundedIcon },
  { key: 'notifications', icon: NotificationsRoundedIcon }
] as const

const DeleteAccount: React.FC<Props> = ({ address, onOpenDeleteAccountModal, onGoToWallets }) => {
  const isTabletOrBelow = useTabletAndBelowMediaQuery()

  return (
    <Container>
      {!isTabletOrBelow && (
        <Header>
          <Title variant="h3">{t('delete_account.title')}</Title>
        </Header>
      )}

      <ContentWrapper>
        <DangerBanner>
          <DangerBannerIcon />
          <DangerBannerTextWrapper>
            <DangerBannerTitle>{t('delete_account.danger_zone')}</DangerBannerTitle>
            <DangerBannerDescription>{t('delete_account.danger_description')}</DangerBannerDescription>
          </DangerBannerTextWrapper>
        </DangerBanner>

        <WarningCard>
          <WarningDescription>{t('delete_account.warning')}</WarningDescription>
          <ConsequencesList>
            {CONSEQUENCES.map(({ key, icon: Icon }) => (
              <ConsequenceItem key={key}>
                <ConsequenceIcon>
                  <Icon />
                </ConsequenceIcon>
                <span>
                  <ConsequenceTitle>{t(`delete_account.consequences.${key}.title`)}</ConsequenceTitle>
                  {' - '}
                  {t(`delete_account.consequences.${key}.description`)}
                </span>
              </ConsequenceItem>
            ))}
          </ConsequencesList>
        </WarningCard>

        <AssetWarningBox>
          <AssetWarningIcon />
          <AssetWarningTextWrapper>
            <AssetWarningTitle>{t('delete_account.asset_warning_title')}</AssetWarningTitle>
            <AssetWarningDescription>{t('delete_account.asset_warning_description')}</AssetWarningDescription>
            <ExportKeyDescription>{t('delete_account.export_key_description')}</ExportKeyDescription>
            <ExportKeyLink variant="text" onClick={onGoToWallets}>
              {t('delete_account.export_key_link')}
            </ExportKeyLink>
          </AssetWarningTextWrapper>
        </AssetWarningBox>

        <DeleteButton variant="contained" disabled={!address} onClick={() => address && onOpenDeleteAccountModal(address)}>
          {t('delete_account.delete_button')}
        </DeleteButton>
      </ContentWrapper>
    </Container>
  )
}

export default DeleteAccount
