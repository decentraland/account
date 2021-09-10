import { connect } from 'react-redux'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
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
import { ImportWithdrawalErrors } from '../../../modules/mana/sagas'

const mapState = (state: RootState): MapState => {
  const { error } = state.mana

  const unformatedImportError = error?.startsWith(IMPORT_WITHDRAWAL_REQUEST)
    ? error.split(' - ')[1]
    : undefined

  let importError: string | undefined

  if (unformatedImportError) {
    switch (unformatedImportError) {
      case ImportWithdrawalErrors.NOT_FOUND:
        importError = t('import_withdrawal_modal.errors.not_found')
        break
      case ImportWithdrawalErrors.NOT_WITHDRAWAL:
        importError = t('import_withdrawal_modal.errors.not_withdrawal')
        break
      case ImportWithdrawalErrors.NOT_OWN_TRANSACTION:
        importError = t('import_withdrawal_modal.errors.not_own_tx')
        break
      case ImportWithdrawalErrors.ALREADY_PROCESSED:
        importError = t('import_withdrawal_modal.errors.already_processed')
        break
      default:
        importError = unformatedImportError
    }
  }

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
