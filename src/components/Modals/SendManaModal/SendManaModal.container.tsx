import { connect } from 'react-redux'
import { sendManaRequest } from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import { MapDispatch, MapDispatchProps } from './SendManaModal.types'
import SendManaModal from './SendManaModal'

const mapState = (_state: RootState) => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSendMana: (to, amount) => dispatch(sendManaRequest(to, amount)),
})

export default connect(mapState, mapDispatch)(SendManaModal)
