import { BaseClient, BaseClientConfig } from '../api/BaseClient'

export type NotificationsAPIConfig = BaseClientConfig & {
  url?: string
}

const DEFAULT_NOTIFICATIONS_URL = 'https://notifications-processor.decentraland.org'

export class NotificationsAPI extends BaseClient {
  constructor(config?: NotificationsAPIConfig) {
    super(config?.url || DEFAULT_NOTIFICATIONS_URL, config)
  }

  async getSubscription(): Promise<any> {
    return this.fetch('/subscription')
  }

  async putSubscription(details: any): Promise<void> {
    await this.rawFetch('/subscription', {
      method: 'PUT',
      body: JSON.stringify(details)
    })
  }

  async putEmail(email: string): Promise<void> {
    await this.rawFetch('/subscription/email', {
      method: 'PUT',
      body: JSON.stringify({ email })
    })
  }

  async postEmailConfirmationCode(body: { address: string; code: string; turnstileToken?: string }): Promise<void> {
    await this.rawFetch('/subscription/email/confirm', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }
}
