import { connect } from 'react-redux'
import { openModal } from '../../../../modules/modal/actions'
import { RootState } from '../../../../modules/reducer'
import AccountCardHeader from './AccountCardHeader'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './AccountCardHeader.types'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSendMana: () => dispatch(openModal('SendManaModal')),
})

export default connect(mapState, mapDispatch)(AccountCardHeader)
