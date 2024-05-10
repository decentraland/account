import { useCallback, useEffect, useState } from 'react'
import { NotificationType } from '@dcl/schemas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { objectToSnake, toCamel } from 'ts-case-convert'
import { Alert, Skeleton, Snackbar, Switch } from 'decentraland-ui2'
import NotificationIcon from '../../NotificationIcon'
import {
  AccordingDescription,
  AccordingTitle,
  AccordionDetailsStyled,
  AccordionStyled,
  AccordionSummaryContainer,
  AccordionSummaryStyled,
  NotificationItemContainer,
  NotificationItemText,
  NotificationItemTextIconContainer
} from './NotificationGroupCard.styled'
import { Props } from './NotificationGroupCard.types'

function NotificationGroupCard(props: Props) {
  const {
    isLoading,
    isSavingSubscription,
    subscriptionGroupKeys,
    notificationTypesInGroup,
    defaultExpanded,
    disabled,
    subscriptionDetails,
    error,
    onChangeNotificationSetting
  } = props

  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])

  const handleOnChangeNotificationSetting = useCallback(
    (checked: boolean, type: NotificationType) => {
      if (!isLoading) {
        const subscriptionDetailsChanged = {
          ...subscriptionDetails,
          messageType: { ...subscriptionDetails.messageType, [toCamel(type)]: { inApp: true, email: checked } }
        }
        onChangeNotificationSetting(objectToSnake(subscriptionDetailsChanged))
      }
    },
    [subscriptionDetails, onChangeNotificationSetting, isLoading]
  )

  const handleClose = useCallback(() => {
    setShowError(false)
  }, [])

  return (
    <>
      <AccordionStyled defaultExpanded={defaultExpanded}>
        <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />}>
          <AccordionSummaryContainer>
            {isLoading ? (
              <Skeleton animation="wave" width={100} height={20} />
            ) : (
              <AccordingTitle>{t(`settings.notifications.subscription_group_label_${subscriptionGroupKeys}`)}</AccordingTitle>
            )}
            {isLoading ? (
              <Skeleton animation="wave" width={200} height={24} />
            ) : (
              <AccordingDescription>
                {t(`settings.notifications.subscription_group_description_${subscriptionGroupKeys}`)}
              </AccordingDescription>
            )}
          </AccordionSummaryContainer>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          {notificationTypesInGroup.map(type => (
            <NotificationItemContainer key={type}>
              <NotificationItemTextIconContainer>
                <NotificationIcon name={type} />
                <NotificationItemText>{t(`settings.notifications.types.${type}`)}</NotificationItemText>
              </NotificationItemTextIconContainer>
              {!disabled && (
                <Switch
                  onChange={(_, checked) => handleOnChangeNotificationSetting(checked, type)}
                  checked={subscriptionDetails.messageType[toCamel(type)].email}
                  disabled={isSavingSubscription}
                />
              )}
            </NotificationItemContainer>
          ))}
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Snackbar open={showError} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity="error" variant="filled">
          {t('settings.notifications.saving_settings_error')}
        </Alert>
      </Snackbar>
    </>
  )
}

export default NotificationGroupCard
