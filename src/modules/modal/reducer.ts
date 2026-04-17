import { CLOSE_ALL_MODALS, CLOSE_MODAL, CloseAllModalsAction, CloseModalAction, OPEN_MODAL, OpenModalAction } from './actions'

export type ModalState = {
  [key: string]: {
    open: boolean
    metadata?: any
  }
}

const INITIAL_STATE: ModalState = {}

type ModalReducerAction = OpenModalAction | CloseModalAction | CloseAllModalsAction

export function modalReducer(state = INITIAL_STATE, action: ModalReducerAction): ModalState {
  switch (action.type) {
    case OPEN_MODAL: {
      const { name, metadata } = action.payload
      return {
        ...state,
        [name]: { open: true, metadata }
      }
    }
    case CLOSE_MODAL: {
      const { name } = action.payload
      return {
        ...state,
        [name]: { open: false }
      }
    }
    case CLOSE_ALL_MODALS: {
      const result: ModalState = {}
      for (const key of Object.keys(state)) {
        result[key] = { open: false }
      }
      return result
    }
    default:
      return state
  }
}
