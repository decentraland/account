export const locations = {
  root: () => '/',
  confirmEmail: () => '/confirm-email/:token',
  unifiedEmailConfirmation: () => '/confirm-email-challenge/:token',
  signIn: (redirectTo?: string) => {
    return `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
  },
  creditsEmail: () => '/credits-email-confirmed/:token',
  testing: () => '/testing'
}
