import { RootState } from '../reducer'

export const getState = (state: RootState) => state.mana
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getManaPrice = (state: RootState) => getData(state).price
