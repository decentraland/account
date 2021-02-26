import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AvatarFace, Button, Header } from 'decentraland-ui'
import { Props } from './AccountHeader.types'
import './AccountHeader.css'

const BUILDER_URL = process.env.REACT_APP_BUILDER_URL!
const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL!

const AccountHeader = (props: Props) => {
  const { avatar } = props

  const handleChangeAlias = () => {
    window.open(`${BUILDER_URL}/names`, '_blank')
  }

  const handleEditAvatar = () => {
    window.open(`${EXPLORER_URL}/?OPEN_AVATAR_EDITOR`, '_blank')
  }

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
        <Button primary inverted onClick={handleChangeAlias}>
          {t('account_header.actions.change_alias')}
        </Button>
        <Button primary inverted onClick={handleEditAvatar}>
          {t('account_header.actions.edit_avatar')}
        </Button>
      </div>
    </Header>
  )
}

export default React.memo(AccountHeader)
