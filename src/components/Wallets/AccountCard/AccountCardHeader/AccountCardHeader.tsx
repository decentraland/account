import React, { useCallback, useState } from 'react'
import { Network } from '@dcl/schemas'
import { Button, Menu, MenuItem, Tooltip } from 'decentraland-ui2'
import { getAnalytics } from '../../../../lib/utils/analytics'
import { t } from '../../../../lib/utils/translation'
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
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null)
  }, [])

  const handleTransferMana = () => {
    handleMenuClose()
    onTransfer(network)
  }

  const handleReceiveMana = () => {
    handleMenuClose()
    if (address) {
      onReceive(network, address)
    }
  }

  const handleImportWithdrawal = () => {
    handleMenuClose()
    onImportWithdrawal()
  }

  const handleAddTokens = () => {
    analytics?.track('Open BUY MANA modal')

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
            <Tooltip title={tooltipMessage} placement="top">
              <div className="info-logo" />
            </Tooltip>
          </div>
          <div className="operation-menu">
            <Button onClick={handleMenuOpen}>...</Button>
            <Menu anchorEl={menuAnchorEl} open={isMenuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleTransferMana}>{t('account_card_header.send')}</MenuItem>
              <MenuItem onClick={handleReceiveMana}>{t('account_card_header.receive')}</MenuItem>
              {network === Network.MATIC && (
                <MenuItem onClick={handleImportWithdrawal}>{t('account_card_header.import_withdrawal')}</MenuItem>
              )}
            </Menu>
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
