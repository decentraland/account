import { Redirect, Route, Switch } from 'react-router-dom'
import Intercom from 'decentraland-dapps/dist/components/Intercom'
import { config } from '../../config'
import { locations } from '../../modules/locations'
import { ConfirmPage } from '../ConfirmPage'
import { HomePage } from '../HomePage'
import { MainPage } from '../MainPage'
import { ProtectedRoute } from '../ProtectedRoute'
import { SignInPage } from '../SignInPage'
import { Props } from './Routes.types'

const Routes = ({ isSubscriptionEnabled }: Props) => {
  const APP_ID = config.get('INTERCOM_APP_ID')

  return (
    <>
      <Switch>
        <Route path={locations.signIn()} component={SignInPage} />
        <ProtectedRoute exact path={locations.confirmEmail()} component={ConfirmPage} />
        <ProtectedRoute path={locations.root()} component={!isSubscriptionEnabled ? HomePage : MainPage} />
        <Redirect to={locations.root()} />
      </Switch>
      {APP_ID ? <Intercom appId={APP_ID} settings={{ alignment: 'right' }} /> : null}
    </>
  )
}

export default Routes
