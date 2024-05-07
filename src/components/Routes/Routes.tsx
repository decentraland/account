import { Redirect, Route, Switch } from 'react-router-dom'

import Intercom from 'decentraland-dapps/dist/components/Intercom'

import { Props } from './Routes.types'
import { config } from '../../config'
import { locations } from '../../modules/locations'
import { HomePage } from '../HomePage'
import { SignInPage } from '../SignInPage'

const Routes = ({ isConnected }: Props) => {
  const APP_ID = config.get('INTERCOM_APP_ID')

  if (!isConnected) {
    return (
      <>
        <Switch>
          <Route exact path={locations.signIn()} component={SignInPage} />
          <Redirect to={locations.signIn()} />
        </Switch>
      </>
    )
  }

  return (
    <>
      <Switch>
        <Route exact path={locations.root()} component={HomePage} />
        <Redirect to={locations.root()} />
      </Switch>
      {APP_ID ? <Intercom appId={APP_ID} settings={{ alignment: 'right' }} /> : null}
    </>
  )
}

export default Routes
