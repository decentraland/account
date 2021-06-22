import React from 'react'
import { Network } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Dropdown, Popup } from 'decentraland-ui'
import { Props } from './AccountCardHeader.types'
import './AccountCardHeader.css'

const AccountCardHeader = ({
  address,
  network,
  title,
  amount,
  onTransfer,
  onReceive,
  onConvert,
  onPurchase,
}: Props) => {
  const handleTransferMana = () => onTransfer(network)

  const handleReceiveMana = () => {
    if (address) {
      onReceive(network, address)
    }
  }

  const handleAddTokens = () => {
    onPurchase(network)
  }

  const handleConvert = () => onConvert(network)
  let tooltipMessage = ''
  if (network === Network.MATIC) {
    tooltipMessage = t('account_card_header.tooltip_matic')
  } else {
    tooltipMessage = t('account_card_header.tooltip_ethereum')
  }

  return (
    <div className="AccountCardHeader">
      <div className="title">
        <div className="title-text-container">
          {title}
          <Popup
            content={tooltipMessage}
            position="top center"
            trigger={<div className="info-logo" />}
            on="hover"
          />
        </div>
        <div className="operation-menu">
          <Dropdown text="..." direction="left">
            <Dropdown.Menu>
              <Dropdown.Item
                text={t('account_card_header.send')}
                onClick={handleTransferMana}
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
            {(amount | 0).toLocaleString()}
          </div>
        </div>
        <div className="actions">
          <Button onClick={handleAddTokens}>
            {t('account_card_header.add')}
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
