import { locations } from '../locations'

describe('when handling connect wallet success', () => {
  const originalLocation = window.location

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, href: '', pathname: '/account/sign-in', search: '' }
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation
    })
  })

  it('should have the sign in location defined', () => {
    expect(locations.signIn()).toBeDefined()
  })

  it('should have the root location defined', () => {
    expect(locations.root()).toBeDefined()
  })
})
