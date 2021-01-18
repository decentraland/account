import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Icon } from 'decentraland-ui'
import { NetworkType } from '../../HomePage.types'
import { Props } from './AccountCardHeader.types'
import './AccountCardHeader.css'

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
        <Button>{t('account_card_header.convert')}</Button>
      </div>
    </div>
  </div>
)

export default React.memo(AccountCardHeader)
