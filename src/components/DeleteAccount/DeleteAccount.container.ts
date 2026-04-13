import { connect } from 'react-redux'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { Dispatch } from 'redux'
import DeleteAccount from './DeleteAccount'
import { MapDispatchProps, OwnProps } from './DeleteAccount.types'

const mapDispatch = (dispatch: Dispatch): MapDispatchProps => ({
  onOpenDeleteAccountModal: () => dispatch(openModal('DeleteAccountConfirmationModal'))
})

export default connect<{}, MapDispatchProps, OwnProps>(null, mapDispatch)(DeleteAccount)
