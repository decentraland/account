import { LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'
import { UserCreditsStatus } from '../../lib/api/credits'

export { UserCreditsStatus }

export interface CreditsSettingsState {
  status: UserCreditsStatus | null
  optedOutAt: string | null
  loading: LoadingState
  error: string | null
}
