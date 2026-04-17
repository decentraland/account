import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../modules/reducer'

export function createTestStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
