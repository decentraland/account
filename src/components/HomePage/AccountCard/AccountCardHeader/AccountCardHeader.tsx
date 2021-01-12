import React from 'react'
import { Button, Icon } from 'decentraland-ui'
import { Props } from './AccountCardHeader.types'
import './AccountCardHeader.css'
import { NetworkType } from '../AccountCard.types'

const AccountCardHeader = ({ type, title, amount }: Props) => (
  <div className="AccountCardHeader">
    <div className="title">{title}</div>
    <div className="fundsContainer">
      <div className="funds">
        <div className="amount">
          <div
            className={type === NetworkType.MATIC ? 'matic-logo' : 'mana-logo'}
          />
          {amount}
        </div>
      </div>
      <div className="actions">
        <Button>
          <Icon name="plus" />
        </Button>
        <Button>Convert</Button>
      </div>
    </div>
  </div>
)

export default React.memo(AccountCardHeader)
