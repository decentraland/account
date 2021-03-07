import React from 'react'
import { Network } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Dropdown, Icon } from 'decentraland-ui'
import { Props } from './AccountCardHeader.types'
import './AccountCardHeader.css'

const AccountCardHeader = ({
  address,
  network,
  title,
  amount,
  onSend,
  onConvert,
  onReceive,
}: Props) => {
  const handleSendMana = () => onSend(network)

  const handleReceiveMana = () => {
    if (address) {
      onReceive(network, address)
    }
  }

  const handleConvert = () => onConvert(network)

  return (
    <div className="AccountCardHeader">
      <div className="title">
        {title}
        <div className="operation-menu">
          <Dropdown text="..." direction="left">
            <Dropdown.Menu>
              <Dropdown.Item
                text={t('account_card_header.send')}
                onClick={handleSendMana}
              />
              <Dropdown.Item
                text={t('account_card_header.receive')}
                onClick={handleReceiveMana}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="fundsContainer">
        <div className="funds">
          <div className="amount">
            <div
              className={network === Network.MATIC ? 'matic-logo' : 'mana-logo'}
            />
            {parseInt(amount.toFixed(0), 10).toLocaleString()}
          </div>
        </div>
        <div className="actions">
          <Button>
            <Icon name="plus" />
          </Button>
          <Button onClick={handleConvert}>
            {t('account_card_header.convert')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AccountCardHeader)
