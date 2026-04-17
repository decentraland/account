/**
 * Noop exports for removed decentraland-dapps modules.
 * These provide stubs so existing code compiles while being migrated.
 */

// Storage stubs
export const createStorageMiddleware = (..._args: any[]) => ({
  storageMiddleware: () => (next: any) => (action: any) => next(action),
  loadStorageMiddleware: () => {}
})
export const storageReducerWrapper = (reducer: any) => reducer
export const STORAGE_LOAD = 'STORAGE_LOAD'

// Provider stubs
export const ModalProvider = ({ children }: any) => children
export const ToastProvider = ({ children }: any) => children
export const TranslationProvider = ({ children }: any) => children
export const WalletProvider = ({ children }: any) => children

// Container stubs
export const EnhancedIntercom = () => null
export const Web2TransactionModal = () => null
export const NetworkButton = (props: any) => props.children
export const BuyManaWithFiatModal = () => null
export const BuyManaWithFiatFeedbackModal = () => null
export const LoginModal = () => null
export const SignInPage = () => null
export const Navbar2 = (_props: any) => null
export const Footer = (_props: any) => null

// HOC stubs
export const withAuthorizedAction = (component: any, ..._args: any[]) => component
export type WithAuthorizedActionProps = {
  onAuthorizedAction: (...args: any[]) => void
  isLoadingAuthorization: boolean
  authorizationError: string | null
}

// Authorization stubs
export enum AuthorizedAction {
  SWAP_MANA = 'swap_mana'
}

// Default export for modules that use `import X from ...`
export default null as any

// Merge translations stub
export const mergeTranslations = (...args: any[]) => args[0] || {}
export const setCurrentLocale = (_locale: string) => {}
export const I18nProvider = ({ children }: any) => children
