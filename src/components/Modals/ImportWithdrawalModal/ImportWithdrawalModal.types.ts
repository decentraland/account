// import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Withdrawal } from '../../../modules/mana/types'
// import {
//   ClearProfileErrorAction,
//   SetProfileAvatarDescriptionRequestAction,
// } from 'decentraland-dapps/dist/modules/profile/actions'

export type Props = ModalProps & {
  address: string
  isLoading: boolean
  withdrawals: Withdrawal[]
  onImport: () => void
}

// export type OwnProps = ModalProps
export type MapState = Pick<Props, 'address' | 'withdrawals'>
// export type MapDispatchProps = Pick<Props, 'onSubmit'> & {
//   clearError: () => void
// }
// export type MapDispatch = Dispatch<
//   SetProfileAvatarDescriptionRequestAction | ClearProfileErrorAction
// >
