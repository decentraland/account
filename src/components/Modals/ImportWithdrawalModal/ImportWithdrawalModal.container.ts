import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { IMPORT_WITHDRAWAL_REQUEST, clearManaError, importWithdrawalRequest } from '../../../modules/mana/actions'
import { getLoading, getWalletWithdrawals, getWithdrawalImportError } from '../../../modules/mana/selectors'
import { RootState } from '../../../modules/reducer'
import ImportWithdrawalModal from './ImportWithdrawalModal'
import { MapDispatch, MapDispatchProps, MapState, Props } from './ImportWithdrawalModal.types'

const mapState = (state: RootState): MapState => {
  return {
    address: getAddress(state)!,
    withdrawals: getWalletWithdrawals(state),
    isLoading: isLoadingType(getLoading(state), IMPORT_WITHDRAWAL_REQUEST),
    error: getWithdrawalImportError(state) || undefined
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClearError: () => dispatch(clearManaError()),
  onImport: (txHash: string) => dispatch(importWithdrawalRequest(txHash))
})

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatchProps, ownProps: Props): Props => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClose: () => {
    ownProps.onClose()
    dispatchProps.onClearError()
  }
})

export default connect(mapState, mapDispatch, mergeProps)(ImportWithdrawalModal)
