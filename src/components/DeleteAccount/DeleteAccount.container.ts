import { connect } from 'react-redux'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { Dispatch } from 'redux'
import { RootState } from '../../modules/reducer'
import DeleteAccount from './DeleteAccount'
import { MapDispatchProps, MapStateProps } from './DeleteAccount.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state)
})

const mapDispatch = (dispatch: Dispatch): MapDispatchProps => ({
  onOpenDeleteAccountModal: (address: string) => dispatch(openModal('DeleteAccountConfirmationModal', { address }))
})

export default connect(mapState, mapDispatch)(DeleteAccount)
