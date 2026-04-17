import { action } from '../../lib/utils/action'

export const OPEN_MODAL = 'Open modal'
export const CLOSE_MODAL = 'Close modal'
export const CLOSE_ALL_MODALS = 'Close all modals'

export const openModal = (name: string, metadata?: any) => action(OPEN_MODAL, { name, metadata })
export const closeModal = (name: string) => action(CLOSE_MODAL, { name })
export const closeAllModals = () => action(CLOSE_ALL_MODALS)

export type OpenModalAction = ReturnType<typeof openModal>
export type CloseModalAction = ReturnType<typeof closeModal>
export type CloseAllModalsAction = ReturnType<typeof closeAllModals>
