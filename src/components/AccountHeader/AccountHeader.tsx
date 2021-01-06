import React from 'react'
import { AvatarFace, Button, Header } from 'decentraland-ui'
import { Props } from './AccountHeader.types'
import './AccountHeader.css'

const AccountHeader = (_props: Props) => {
  return (
    <Header size="large" className="AccountHeader">
      <AvatarFace size="large" />
      <div className="profile-text">
        <div className="profile-name"> Satanas </div>
        <div className="profile-description"> At the movies </div>
      </div>
      <div className="actions">
        <Button primary inverted> Change Alias </Button>
        <Button primary inverted> Edit avatar </Button>
      </div>
    </Header>
  )
}

export default React.memo(AccountHeader)
