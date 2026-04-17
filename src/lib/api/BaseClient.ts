import type { AuthIdentity } from '@dcl/crypto'

export type BaseClientConfig = {
  identity?: () => AuthIdentity | undefined | null
}

export class BaseClient {
  protected url: string
  protected config: BaseClientConfig

  constructor(url: string, config?: BaseClientConfig) {
    this.url = url
    this.config = config ?? {}
  }

  protected async rawFetch(path: string, init?: RequestInit): Promise<Response> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string>)
    }

    const identity = this.config.identity?.()
    if (identity) {
      // Add auth chain headers for signed requests
      const authChain = identity.authChain
      for (let i = 0; i < authChain.length; i++) {
        const link = authChain[i]
        headers[`x-identity-auth-chain-${i}`] = JSON.stringify(link)
      }
    }

    return fetch(`${this.url}${path}`, {
      ...init,
      headers
    })
  }

  protected async fetch<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await this.rawFetch(path, init)
    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      throw new Error(body.message || body.error || `Request failed with status ${response.status}`)
    }
    return response.json()
  }
}
