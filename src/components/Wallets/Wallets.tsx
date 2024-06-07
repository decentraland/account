import React, { useCallback, useState } from 'react'
import { Network } from '@dcl/schemas'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Tooltip } from 'decentraland-ui2'
import { DepositStatus, WithdrawalStatus } from '../../modules/mana/types'
import { shortening } from '../../modules/wallet/utils'
import DepositTooltip from '../Tooltips/DepositTooltip'
import WithdrawalTooltip from '../Tooltips/WithdrawalTooltip'
import { Title } from '../Typography'
import { AccountCard } from './AccountCard'
import AccountCardContainer from './AccountCardContainer/AccountCardContainer'
import { Address, ContentCopyRoundedIcon, Description, Header } from './Wallets.styled'
import { Props } from './Wallets.types'

const Wallets: React.FC<Props> = props => {
  const { withdrawals, deposits, transactionsByNetwork, address } = props
  const [openTooltip, setOpenTooltip] = useState(false)
  const ethereumTransactions = transactionsByNetwork[Network.ETHEREUM]
  const maticTransactions = transactionsByNetwork[Network.MATIC]

  const isFirstWithdrawal = withdrawals.length === 1 && withdrawals[0].status === WithdrawalStatus.PENDING
  const isFirstDeposits = deposits.length === 1 && deposits[0].status === DepositStatus.PENDING

  const handleCopyAddres = useCallback(() => {
    setOpenTooltip(true)
    navigator.clipboard.writeText(address)
    setTimeout(() => {
      setOpenTooltip(false)
    }, 1200)
  }, [address])

  const handleTooltipClose = useCallback(() => {
    setOpenTooltip(false)
  }, [])

  return (
    <>
      <Header>
        <Title variant="h3">{t('main_page.wallets')}</Title>
        <Description variant="subtitle1">
          <AccountBalanceWalletRoundedIcon />
          <Address>{shortening(address)}</Address>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleTooltipClose}
            open={openTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={t('main_page.copied')}
            leaveDelay={1200}
            placement="right"
            arrow
          >
            <ContentCopyRoundedIcon onClick={handleCopyAddres} />
          </Tooltip>
        </Description>
      </Header>
      <AccountCardContainer>
        <AccountCard network={Network.ETHEREUM} title="Ethereum MANA" transactions={ethereumTransactions} />
        <AccountCard network={Network.MATIC} title="Polygon MANA" transactions={maticTransactions} />
      </AccountCardContainer>
      {isFirstDeposits ? <DepositTooltip /> : isFirstWithdrawal ? <WithdrawalTooltip /> : null}
    </>
  )
}

export default React.memo(Wallets)
