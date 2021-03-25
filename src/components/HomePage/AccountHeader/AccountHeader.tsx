import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AvatarFace, Button, Header } from 'decentraland-ui'
import { Props } from './AccountHeader.types'
import './AccountHeader.css'

const BUILDER_URL = process.env.REACT_APP_BUILDER_URL!
const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL!

const AccountHeader = (props: Props) => {
  const { avatar } = props

  return (
    <Header size="large" className="AccountHeader">
      <AvatarFace size="large" avatar={avatar || undefined} />
      <div className="profile-text">
        <div className="profile-name">
          {avatar ? avatar.name : t('global.guest')}
        </div>
        {avatar && avatar.description ? (
          <div className="profile-description">{avatar.description}</div>
        ) : null}
      </div>
      <div className="actions">
        <Button primary inverted href={`${BUILDER_URL}/names`} target="_blank">
          {t('account_header.actions.change_alias')}
        </Button>
        <Button
          primary
          inverted
          href={`${EXPLORER_URL}/?OPEN_AVATAR_EDITOR`}
          target="_blank"
        >
          {t('account_header.actions.edit_avatar')}
        </Button>
      </div>
    </Header>
  )
}

export default React.memo(AccountHeader)
