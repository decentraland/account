import { useCallback, useEffect, useMemo, useState } from 'react'
import { Email } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { objectToSnake } from 'ts-case-convert'
import { CircularProgress } from 'decentraland-ui2'
import { Description, Title } from '../../Typography'
import { Button, Card, InputContainer, SpanUnconfirmedEmail, Switch, TextField, TitleContainer } from './NotificationEmailCard.styled'
import { Props } from './NotificationEmailCard.types'

export const NOTIFICATION_EMAIL_CARD_TITLE_TEST_ID = 'notification-card-title-test-id'
export const NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID = 'notification-card-description-test-id'
export const NOTIFICATION_EMAIL_CARD_UNCONFIRMED_TEST_ID = 'notification-card-unconfirmed-test-id'
export const NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID = 'notification-card-switch-test-id'
export const NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID = 'notification-card-input-test-id'
export const NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID = 'notification-card-button-test-id'
export const NOTIFICATION_EMAIL_CARD_BUTTON_LOADING_TEST_ID = 'notification-card-button-loading-test-id'

function NotificationEmailCard(props: Props) {
  const {
    isLoading,
    email: emailProp,
    unconfirmedEmail,
    isIgnoringAllEmail,
    subscriptionDetails,
    hasConfirmEmail,
    onChangeEmail,
    onChangeNotificationSetting
  } = props
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [email, setEmail] = useState(unconfirmedEmail || emailProp)

  useEffect(() => {
    if (unconfirmedEmail || emailProp) {
      setEmail(unconfirmedEmail || emailProp)
    }
  }, [emailProp, unconfirmedEmail])

  const handleSaveEmail = useCallback(() => {
    if (Email.validate(email)) {
      setIsValidEmail(true)
      onChangeEmail(email)
    } else {
      setIsValidEmail(false)
    }
  }, [email])

  const handleOnChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  const handleOnChangeNotificationSetting = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (!isLoading) {
        const subscriptionDetailsChanged = {
          ...subscriptionDetails,
          isIgnoringAllEmail: !checked
        }
        onChangeNotificationSetting(objectToSnake(subscriptionDetailsChanged))
      }
    },
    [subscriptionDetails, onChangeNotificationSetting, isLoading]
  )

  const descriptionText = useMemo(() => {
    if (!emailProp && !unconfirmedEmail && !hasConfirmEmail) {
      return t('settings.notifications.email.description.without_email')
    } else if (unconfirmedEmail) {
      return t('settings.notifications.email.description.pending_approval')
    } else if (hasConfirmEmail) {
      return t('settings.notifications.email.description.confirmed')
    }
    return t('settings.notifications.email.description.with_email')
  }, [emailProp, unconfirmedEmail, hasConfirmEmail])

  const buttonText = useMemo(() => {
    if (!emailProp && !unconfirmedEmail && !hasConfirmEmail) {
      return t('settings.notifications.email.button_submit_label')
    } else if (unconfirmedEmail) {
      return t('settings.notifications.email.button_resend_label')
    }
    return t('settings.notifications.email.button_edit_label')
  }, [emailProp, unconfirmedEmail, hasConfirmEmail])

  return (
    <>
      <Card>
        <TitleContainer>
          <Title variant="h6" data-testid={NOTIFICATION_EMAIL_CARD_TITLE_TEST_ID}>
            {t('settings.notifications.email.title')}

            {(unconfirmedEmail || hasConfirmEmail) && (
              <SpanUnconfirmedEmail confirmed={hasConfirmEmail} data-testid={NOTIFICATION_EMAIL_CARD_UNCONFIRMED_TEST_ID}>
                {hasConfirmEmail ? t('settings.notifications.email.confirmed') : t('settings.notifications.email.pending_approval')}
              </SpanUnconfirmedEmail>
            )}
          </Title>
          {!!emailProp && (
            <Switch
              onChange={handleOnChangeNotificationSetting}
              checked={!isIgnoringAllEmail}
              data-testid={NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID}
            />
          )}
        </TitleContainer>
        <Description data-testid={NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID}>{descriptionText}</Description>
        <InputContainer>
          <TextField
            type="email"
            placeholder={t('settings.notifications.email.placeholder')}
            value={email}
            onChange={handleOnChangeEmail}
            variant="outlined"
            error={!isValidEmail}
            helperText={!isValidEmail && t('settings.notifications.email.invalid_email')}
            disabled={isLoading}
            data-testid={NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID}
          />
          <Button variant="contained" onClick={handleSaveEmail} disabled={isLoading} data-testid={NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID}>
            {isLoading ? <CircularProgress size={20} data-testid={NOTIFICATION_EMAIL_CARD_BUTTON_LOADING_TEST_ID} /> : buttonText}
          </Button>
        </InputContainer>
      </Card>
    </>
  )
}

export default NotificationEmailCard
