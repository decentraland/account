import { Redirect, Route, Switch } from 'react-router-dom'
import Intercom from 'decentraland-dapps/dist/components/Intercom'
import { config } from '../../config'
import { locations } from '../../modules/locations'
import { ConfirmPage } from '../ConfirmPage'
import { HomePage } from '../HomePage'
import { MainPage } from '../MainPage'
import { SignInPage } from '../SignInPage'
import { Props } from './Routes.types'

const Routes = ({ isConnected, isSubscriptionEnabled }: Props) => {
  const APP_ID = config.get('INTERCOM_APP_ID')
  const params = new URLSearchParams(window.location.search)
  const hasConfirmEmail = params.get('hasConfirmEmail') || '/'
  console.log('Routes > params > ', { params })
  console.log('Routes > hasConfirmEmail > ', hasConfirmEmail)
  if (!isConnected) {
    return (
      <>
        <Switch>
          <Route path={locations.signIn()} component={SignInPage} />
          <Redirect
            to={{
              pathname: '/sign-in',
              search: `?redirectTo=${window.location.pathname + window.location.search}`
            }}
          />
        </Switch>
      </>
    )
  }
  if (!isSubscriptionEnabled) {
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
  console.log('Routes > window.location.pathname > ', window.location.pathname)
  return (
    <>
      <Switch>
        <Route path={locations.root()} component={MainPage} />
        <Route path={locations.confirmEmail()} component={ConfirmPage} />
      </Switch>
      {APP_ID ? <Intercom appId={APP_ID} settings={{ alignment: 'right' }} /> : null}
    </>
  )
}

export default Routes
