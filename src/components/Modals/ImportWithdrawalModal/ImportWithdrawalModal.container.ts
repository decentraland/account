import { connect } from 'react-redux'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../modules/reducer'
import {
  MapState,
  MapDispatchProps,
  MapDispatch,
  Props,
} from './ImportWithdrawalModal.types'
import ImportWithdrawalModal from './ImportWithdrawalModal'
import { getLoading, getWithdrawals } from '../../../modules/mana/selectors'
import {
  clearManaError,
  importWithdrawalRequest,
  IMPORT_WITHDRAWAL_REQUEST,
} from '../../../modules/mana/actions'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'

const mapState = (state: RootState): MapState => {
  const { error } = state.mana
  const importError = error?.startsWith(IMPORT_WITHDRAWAL_REQUEST)
    ? error.split(' - ')[1]
    : undefined

  return {
    address: getAddress(state)!,
    withdrawals: getWithdrawals(state),
    isLoading: isLoadingType(getLoading(state), IMPORT_WITHDRAWAL_REQUEST),
    error: importError,
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClearError: () => dispatch(clearManaError()),
  onImport: (txHash: string) => dispatch(importWithdrawalRequest(txHash)),
})

const mergeProps = (
  stateProps: MapState,
  dispatchProps: MapDispatchProps,
  ownProps: Props
): Props => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClose: () => {
    ownProps.onClose()
    dispatchProps.onClearError()
  },
})

export default connect(mapState, mapDispatch, mergeProps)(ImportWithdrawalModal)
