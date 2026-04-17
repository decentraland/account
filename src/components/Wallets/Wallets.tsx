import React, { Suspense, lazy, useCallback, useState } from 'react'
import { useTokenBalance } from '@dcl/core-web3'
import { ChainId, Network, ProviderType } from '@dcl/schemas'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import { Tooltip } from 'decentraland-ui2'
import { config } from '../../config'
import { t } from '../../lib/utils/translation'
import { DepositStatus, WithdrawalStatus } from '../../modules/mana/types'
import { shortening } from '../../modules/wallet/utils'
import DepositTooltip from '../Tooltips/DepositTooltip'
import WithdrawalTooltip from '../Tooltips/WithdrawalTooltip'
import { Title } from '../Typography'
import { AccountCard } from './AccountCard'
import AccountCardContainer from './AccountCardContainer/AccountCardContainer'
import { Address as AddressStyled, ContentCopyRoundedIcon, Description, Header } from './Wallets.styled'
import { Props } from './Wallets.types'
import type { Address } from 'viem'

const ThirdwebWalletManager = lazy(() => import('./ThirdwebWalletManager/ThirdwebWalletManager'))

const isProd = config.get('CHAIN_ID') === '1'

const Wallets: React.FC<Props> = props => {
  const { withdrawals, deposits, transactionsByNetwork, address, providerType } = props
  const [openTooltip, setOpenTooltip] = useState(false)
  const ethereumTransactions = transactionsByNetwork[Network.ETHEREUM]
  const maticTransactions = transactionsByNetwork[Network.MATIC]

  const { balance: manaEth } = useTokenBalance({
    tokenAddress: config.get('MANA_TOKEN_ADDRESS_ETHEREUM') as Address,
    chainId: isProd ? ChainId.ETHEREUM_MAINNET : ChainId.ETHEREUM_SEPOLIA
  })

  const { balance: manaMatic } = useTokenBalance({
    tokenAddress: config.get('MANA_TOKEN_ADDRESS_MATIC') as Address,
    chainId: isProd ? ChainId.MATIC_MAINNET : ChainId.MATIC_AMOY
  })

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
        {providerType === ProviderType.THIRDWEB ? (
          <Suspense fallback={null}>
            <ThirdwebWalletManager />
          </Suspense>
        ) : (
          <Description variant="subtitle1">
            <AccountBalanceWalletRoundedIcon />
            <AddressStyled>{shortening(address)}</AddressStyled>
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
        )}
      </Header>
      <AccountCardContainer>
        <AccountCard
          network={Network.ETHEREUM}
          title="Ethereum MANA"
          transactions={ethereumTransactions}
          amount={parseFloat(manaEth ?? '0') || 0}
        />
        <AccountCard
          network={Network.MATIC}
          title="Polygon MANA"
          transactions={maticTransactions}
          amount={parseFloat(manaMatic ?? '0') || 0}
        />
      </AccountCardContainer>
      {isFirstDeposits ? <DepositTooltip /> : isFirstWithdrawal ? <WithdrawalTooltip /> : null}
    </>
  )
}

export default React.memo(Wallets)
