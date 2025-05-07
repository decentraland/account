import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { validateCreditsEmailRequest } from '../../modules/subscription/actions'
import CreditsEmail from './CreditsEmail'
import { MapDispatch, MapDispatchProps, MapStateProps } from './CreditsEmail.types'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onValidateCreditsEmailRequest: (params: { address: string; code: string }) => dispatch(validateCreditsEmailRequest(params))
})

export default connect(mapState, mapDispatch)(CreditsEmail)
