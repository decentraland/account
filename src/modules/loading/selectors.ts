import { LoadingState } from './reducer'

export function isLoadingType(loadingState: LoadingState, actionType: string): boolean {
  return loadingState.some(item => item.type === actionType)
}
