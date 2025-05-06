export const locations = {
  root: () => '/',
  confirmEmail: () => '/confirm-email/:token',
  signIn: (redirectTo?: string) => {
    return `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
  },
  creditsEmail: () => '/credits-email-confirmed'
}
