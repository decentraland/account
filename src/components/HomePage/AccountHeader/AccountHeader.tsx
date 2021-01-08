import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AvatarFace, Button, Header } from 'decentraland-ui'
import { Props } from './AccountHeader.types'
import './AccountHeader.css'

const AccountHeader = (props: Props) => {
  const { avatar } = props
  return (
    <Header size="large" className="AccountHeader">
      <AvatarFace size="large" avatar={avatar || undefined} />
      <div className="profile-text">
        <div className="profile-name">
          {avatar ? avatar.name : t('global.guest')}
        </div>
        <div className="profile-description">
          {avatar ? avatar.description : null}
        </div>
      </div>
      <div className="actions">
        <Button primary inverted>
          {t('account_header.actions.change_alias')}
        </Button>
        <Button primary inverted>
          {t('account_header.actions.edit_avatar')}
        </Button>
      </div>
    </Header>
  )
}

export default React.memo(AccountHeader)
