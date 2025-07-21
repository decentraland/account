import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Dispatch } from 'redux'
import { finishWithdrawalRequest } from '../../../modules/mana/actions'
import { Withdrawal } from '../../../modules/mana/types'

type Metadata = {
  txHash: string
}

export type Props = Omit<ModalProps, 'metadata'> & {
  metadata: Metadata
  isLoading: boolean
  withdrawal: Withdrawal | undefined
  isFinalizingWithdrawal: boolean
  onFinishWithdrawal: typeof finishWithdrawalRequest
}

export type State = {}
export type OwnProps = ModalProps & {
  metadata: Metadata
}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onFinishWithdrawal'>
