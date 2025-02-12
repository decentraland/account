import React from 'react'
import { Network } from '@dcl/schemas'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
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
  onImportWithdrawal,
  onAddTokens
}: Props) => {
  const analytics = getAnalytics()

  const handleTransferMana = () => onTransfer(network)

  const handleReceiveMana = () => {
    if (address) {
      onReceive(network, address)
    }
  }

  const handleImportWithdrawal = () => {
    onImportWithdrawal()
  }

  const handleAddTokens = () => {
    if (analytics) {
      analytics.track('Open BUY MANA modal')
    }
    onAddTokens(network)
  }

  const handleConvert = () => onConvert(network)
  let tooltipMessage = ''
  if (network === Network.MATIC) {
    tooltipMessage = t('account_card_header.tooltip_matic')
  } else {
    tooltipMessage = t('account_card_header.tooltip_ethereum')
  }

  return (
    <>
      <div className="AccountCardHeader">
        <div className="title">
          <div className="title-text-container">
            {title}
            <Popup content={tooltipMessage} position="top center" trigger={<div className="info-logo" />} on="hover" />
          </div>
          <div className="operation-menu">
            <Dropdown text="..." direction="left">
              <Dropdown.Menu>
                <Dropdown.Item text={t('account_card_header.send')} onClick={handleTransferMana} />
                <Dropdown.Item text={t('account_card_header.receive')} onClick={handleReceiveMana} />
                {network === Network.MATIC && (
                  <Dropdown.Item text={t('account_card_header.import_withdrawal')} onClick={handleImportWithdrawal} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="fundsContainer">
          <div className="funds">
            <div className="amount">
              <div className={network === Network.MATIC ? 'matic-logo' : 'mana-logo'} />
              {(amount ? Number(amount.toFixed(2)) : 0).toLocaleString()}
            </div>
          </div>
          <div className="actions">
            <Button onClick={handleAddTokens}>{t('account_card_header.add')}</Button>
            <Button onClick={handleConvert}>{t('account_card_header.convert')}</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(AccountCardHeader)
