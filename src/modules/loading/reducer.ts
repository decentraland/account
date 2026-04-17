/**
 * Local replacement for decentraland-dapps LoadingState.
 * Tracks which action types are currently loading.
 */
export type LoadingState = { type: string }[]

export function loadingReducer(state: LoadingState, action: { type: string }): LoadingState {
  const { type } = action
  if (type.includes('[Request]')) {
    return [...state, { type }]
  }
  if (type.includes('[Success]') || type.includes('[Failure]')) {
    const requestType = type.replace('[Success]', '[Request]').replace('[Failure]', '[Request]')
    return state.filter(item => item.type !== requestType)
  }
  return state
}
