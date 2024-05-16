import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { buildInitialState } from '../../../modules/subscription/reducer'
import { renderWithProviders } from '../../../specs/utils'
import NotificationEmailCard, {
  NOTIFICATION_EMAIL_CARD_BUTTON_LOADING_TEST_ID,
  NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID,
  NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID,
  NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID,
  NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID,
  NOTIFICATION_EMAIL_CARD_TITLE_TEST_ID,
  NOTIFICATION_EMAIL_CARD_UNCONFIRMED_TEST_ID
} from './NotificationEmailCard'
import { Props } from './NotificationEmailCard.types'

const renderNotificationEmailCard = (props: Partial<Props>) =>
  renderWithProviders(
    <NotificationEmailCard
      isLoading={false}
      isSavingEmail={false}
      subscriptionDetails={buildInitialState().subscriptionDetails}
      onChangeEmail={() => undefined as any}
      onChangeNotificationSetting={() => undefined as any}
      hasConfirmEmail={false}
      isIgnoringAllEmail={true}
      error={null}
      email=""
      {...props}
    />
  )

describe('when the component is loading', () => {
  it('should not render the TextField component in it with disabled prop', () => {
    const { getByTestId } = renderNotificationEmailCard({ isLoading: true })
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID).querySelector('input')).toBeDisabled()
  })
  it('should not render the Button component in it with disabled prop and with a CircularProgress component in it', () => {
    const { getByTestId } = renderNotificationEmailCard({ isLoading: true })
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID)).toBeDisabled()
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID)).toContainElement(
      getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_LOADING_TEST_ID)
    )
  })
})

describe('when the component has finished loading', () => {
  it('should render the Title component in it', () => {
    const { getByTestId } = renderNotificationEmailCard({})
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_TITLE_TEST_ID)).toBeInTheDocument()
  })

  it('should render the Description component in it', () => {
    const { getByTestId } = renderNotificationEmailCard({})
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID)).toBeInTheDocument()
  })

  it('should render the TextField component in it', () => {
    const { getByTestId } = renderNotificationEmailCard({})
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID)).toBeInTheDocument()
  })

  it('should render the Button component in it', () => {
    const { getByTestId } = renderNotificationEmailCard({})
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID)).toBeInTheDocument()
  })

  describe('and the used doesn`t have a previous email set', () => {
    it('should render the TextField component in it with the place holder', () => {
      const { getByTestId } = renderNotificationEmailCard({})
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID).querySelector('input')?.value).toBe('')
    })

    it(`should render the Description component with the text ${t('settings.notifications.email.description.without_email')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({})
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID).textContent).toBe(
        t('settings.notifications.email.description.without_email')
      )
    })
    it(`should render the Button component with the label ${t('settings.notifications.email.button_submit_label')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({})
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID).textContent).toBe(t('settings.notifications.email.button_submit_label'))
    })
  })

  describe('and the user has a previous email set', () => {
    let email: string
    beforeEach(() => {
      email = 'example@decentraland.org'
    })
    it('should render the TextField component in it with the place holder', () => {
      const { getByTestId } = renderNotificationEmailCard({ email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_INPUT_TEST_ID).querySelector('input')?.value).toBe(email)
    })

    it(`should render the Description component with the text ${t('settings.notifications.email.description.with_email')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID).textContent).toBe(
        t('settings.notifications.email.description.with_email')
      )
    })

    it(`should render the Button component with the label ${t('settings.notifications.email.button_edit_label')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID).textContent).toBe(t('settings.notifications.email.button_edit_label'))
    })
  })

  describe('and the email is pending for approval', () => {
    let email: string
    beforeEach(() => {
      email = 'example@decentraland.org'
    })
    it(`should render the SpanUnconfirmedEmail component in it with the text ${t('settings.notifications.email.pending_approval')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ unconfirmedEmail: email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_UNCONFIRMED_TEST_ID).textContent).toBe(t('settings.notifications.email.pending_approval'))
    })

    it(`should render the Description component with the text ${t('settings.notifications.email.description.pending_approval')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ unconfirmedEmail: email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID).textContent).toBe(
        t('settings.notifications.email.description.pending_approval')
      )
    })

    it(`should render the Button component with the label ${t('settings.notifications.email.button_resend_label')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ unconfirmedEmail: email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_BUTTON_TEST_ID).textContent).toBe(t('settings.notifications.email.button_resend_label'))
    })
  })

  describe('and the email is has been approved', () => {
    let email: string
    beforeEach(() => {
      email = 'example@decentraland.org'
    })
    it(`should render the SpanUnconfirmedEmail component in it with the text ${t('settings.notifications.email.confirmed')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ hasConfirmEmail: true })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_UNCONFIRMED_TEST_ID).textContent).toBe(t('settings.notifications.email.confirmed'))
    })
    it('should render the Switch component in it', () => {
      const { getByTestId } = renderNotificationEmailCard({ email })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID)).toBeInTheDocument()
    })
    describe('and the user had configured to ignore all email notifications.', () => {
      it('should set the Switch component as unchecked', () => {
        const { getByTestId } = renderNotificationEmailCard({ email, isIgnoringAllEmail: true })
        expect(getByTestId(NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID).querySelector('input')).not.toBeChecked()
      })
    })
    describe('and the user had configured to accept all email notifications.', () => {
      it('should set the Switch component as checked', () => {
        const { getByTestId } = renderNotificationEmailCard({ email, isIgnoringAllEmail: false })
        console.log(getByTestId(NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID).querySelector('input'))
        expect(getByTestId(NOTIFICATION_EMAIL_CARD_SWITCH_TEST_ID).querySelector('input')).toBeChecked()
      })
    })
    it(`should render the Description component with the text ${t('settings.notifications.email.description.confirmed')}`, () => {
      const { getByTestId } = renderNotificationEmailCard({ hasConfirmEmail: true })
      expect(getByTestId(NOTIFICATION_EMAIL_CARD_DESCRIPTION_TEST_ID).textContent).toBe(
        t('settings.notifications.email.description.confirmed')
      )
    })
  })
})
