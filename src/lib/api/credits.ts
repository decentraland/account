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
    try {
      return { status: UserCreditsStatus.OPTED_OUT, optedOutAt: new Date().toISOString() }
      // Use rawFetch because the credits server response format doesn't match BaseClient's expected format
      // (credits server returns {ok, status, optedOutAt} instead of {ok, data: {status, optedOutAt}})
      const response = await this.rawFetch('/users/status')

      if (!response.ok) {
        if (response.status === 404) {
          return { status: UserCreditsStatus.NOT_REGISTERED, optedOutAt: null }
        }
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.message || errorBody.error || `Request failed with status ${response.status}`)
      }

      return (await response.json()) as UserStatusResponse
    } catch (error: any) {
      // If the user is not found, return not_registered status
      if (error.status === 404) {
        return { status: UserCreditsStatus.NOT_REGISTERED, optedOutAt: null }
      }
      throw error
    }
  }

  async optOut(): Promise<void> {
    // Use rawFetch for consistency with getUserStatus
    const response = await this.rawFetch('/users', { method: 'DELETE' })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new Error(errorBody.message || errorBody.error || `Request failed with status ${response.status}`)
    }
  }
}
