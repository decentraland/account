import { BaseClient, BaseClientConfig } from 'decentraland-dapps/dist/lib'

/**
 * User credits status enum - matches the credits-server response values
 */
export enum UserCreditsStatus {
  ENROLLED = 'enrolled',
  OPTED_OUT = 'opted_out',
  NOT_REGISTERED = 'not_registered'
}

export interface UserStatusResponse {
  status: UserCreditsStatus
  optedOutAt: string | null
}

export class CreditsSettingsAPI extends BaseClient {
  constructor(url: string, config?: BaseClientConfig) {
    super(url, config)
  }

  async getUserStatus(): Promise<UserStatusResponse> {
    // Use rawFetch because we need to handle 404 specially
    const response = await this.rawFetch('/users/status')

    if (!response.ok && response.status === 404) {
      return { status: UserCreditsStatus.NOT_REGISTERED, optedOutAt: null }
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new Error(errorBody.message || errorBody.error || 'Failed to get user status. Please try again later.')
    }

    const json = await response.json()
    return json.data as UserStatusResponse
  }

  async optOut(): Promise<void> {
    const response = await this.rawFetch('/users', { method: 'DELETE' })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new Error(errorBody.message || errorBody.error || 'Failed to opt out. Please try again later.')
    }
  }
}
