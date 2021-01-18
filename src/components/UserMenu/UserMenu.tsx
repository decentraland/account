import * as React from 'react'
import { UserMenu as BaseUserMenu, Row, Menu, Icon } from 'decentraland-ui'
import { Props, State } from './UserMenu.types'
import './UserMenu.css'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

export default class UserMenu extends React.Component<Props, State> {
  render() {
    const {
      profile,
      mana,
      onLogout,
      hasPendingTransactions,
      isActivityPage,
      onNavigateToActivityPage,
      onNavigateToSettingsPage,
      menuItems,
    } = this.props

    const settings = (
      <Menu.Item onClick={onNavigateToSettingsPage}>
        <Icon name="cog"></Icon>
        {t('global.settings')}
      </Menu.Item>
    )

    return (
      <Row>
        <Menu.Item
          className={isActivityPage ? 'ActivityBell active' : 'ActivityBell'}
        >
          <Icon
            className={hasPendingTransactions ? 'pending' : ''}
            name="bell"
            onClick={onNavigateToActivityPage}
          />
        </Menu.Item>
        <BaseUserMenu
          menuItems={
            menuItems && menuItems.length > 0
              ? [...menuItems, settings]
              : settings
          }
          mana={mana}
          isSignedIn
          onSignOut={onLogout}
          avatar={
            profile && profile.avatars.length > 0
              ? profile.avatars[0]
              : undefined
          }
        />
      </Row>
    )
  }
}
