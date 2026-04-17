import { UserCreditsStatus } from '../../lib/api/credits'
import { LoadingState } from '../../modules/loading/reducer'

export { UserCreditsStatus }

export interface CreditsSettingsState {
  status: UserCreditsStatus | null
  optedOutAt: string | null
  loading: LoadingState
  error: string | null
}
