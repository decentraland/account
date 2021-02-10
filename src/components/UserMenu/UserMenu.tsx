import * as React from 'react'
import { UserMenu as BaseUserMenu } from 'decentraland-dapps/dist/containers'

export default class UserMenu extends React.Component<any> {
  render() {
    return <BaseUserMenu {...this.props} />
  }
}
