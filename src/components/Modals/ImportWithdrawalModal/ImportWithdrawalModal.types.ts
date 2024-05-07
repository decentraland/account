import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Dispatch } from 'redux'
import { ClearManaErrorAction, ImportWithdrawalRequestAction } from '../../../modules/mana/actions'
import { Withdrawal } from '../../../modules/mana/types'

export type Props = Omit<ModalProps, 'onClose'> & {
  address: string
  isLoading: boolean
  withdrawals: Withdrawal[]
  error?: string
  onClose: () => void
  onClearError: () => void
  onImport: (txHash: string) => void
}

export type MapState = Pick<Props, 'address' | 'withdrawals' | 'isLoading' | 'error'>
export type MapDispatchProps = Pick<Props, 'onImport' | 'onClearError'>
export type MapDispatch = Dispatch<ImportWithdrawalRequestAction | ClearManaErrorAction>
