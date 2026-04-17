import { clearWagmiState } from '@dcl/core-web3'
import { config } from '../config'

function getBasename(): string {
  return /^decentraland\.(zone|org|today)$/.test(window.location.host) ? '/account' : ''
}

function buildAuthRedirectUrl(path: string, queryParams?: Record<string, string>): string {
  const basename = getBasename()

  const url = new URL(path, window.location.origin)
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  let pathWithQuery = url.pathname + url.search

  if (basename && pathWithQuery.startsWith(basename)) {
    pathWithQuery = pathWithQuery.slice(basename.length) || '/'
  }

  return `${basename}${pathWithQuery}`
}

function resolveAuthUrl(): string {
  const authUrl = config.get('AUTH_URL') ?? '/auth'

  if (authUrl.startsWith('http')) {
    return authUrl
  }

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  if (isLocalhost) {
    return authUrl
  }

  return `${window.location.origin}${authUrl.startsWith('/') ? '' : '/'}${authUrl}`
}

function getRedirectPathFromCurrentUrl(): string {
  const pathname = window.location.pathname
  const search = window.location.search
  const searchParams = new URLSearchParams(search)
  const currentRedirectTo = searchParams.get('redirectTo')
  return currentRedirectTo ?? `${pathname}${search}`
}

function redirectToAuth(path?: string, queryParams?: Record<string, string>): void {
  const redirectPath = path ?? getRedirectPathFromCurrentUrl()
  const redirectTo = buildAuthRedirectUrl(redirectPath, queryParams)
  const authUrl = resolveAuthUrl()

  clearWagmiState()

  window.location.replace(`${authUrl}/login?redirectTo=${encodeURIComponent(redirectTo)}`)
}

export { buildAuthRedirectUrl, redirectToAuth }
