import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Dropdown, Icon } from 'decentraland-ui'
import { NetworkType } from '../../HomePage.types'
import { Props } from './AccountCardHeader.types'
import './AccountCardHeader.css'

const AccountCardHeader = ({ type, title, amount, onSendMana }: Props) => {
  return (
    <div className="AccountCardHeader">
      <div className="title">
        {title}
        <div className="operation-menu">
          <Dropdown text="..." direction="left">
            <Dropdown.Menu>
              <Dropdown.Item
                text={t('account_card_header.send')}
                onClick={() => onSendMana()}
              />
              <Dropdown.Item
                text={t('account_card_header.receive')}
                onClick={() => alert('must be implemented')}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="fundsContainer">
        <div className="funds">
          <div className="amount">
            <div
              className={
                type === NetworkType.MATIC ? 'matic-logo' : 'mana-logo'
              }
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
}

export default React.memo(AccountCardHeader)
