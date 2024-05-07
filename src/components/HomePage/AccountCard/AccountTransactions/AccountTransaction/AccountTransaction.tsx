import React, { useEffect, useState } from 'react'

import { distanceInWordsToNow } from 'decentraland-dapps/dist/lib/utils'
import { Purchase } from 'decentraland-dapps/dist/modules/gateway/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { NetworkGatewayType, gatewaysNames } from 'decentraland-ui'

import { Props } from './AccountTransaction.types'
import { Deposit, TransactionStatus, TransactionType, Transfer, Withdrawal, WithdrawalStatus } from '../../../../../modules/mana/types'
import { getStatusMessage, isPendingAccountTransaction } from '../../../../../modules/mana/utils'

import './AccountTransaction.css'

const AccountTransaction = ({ transaction, onTransactionDetail, onPendingWithdrawal, onPendingPurchase }: Props) => {
  const { type, status } = transaction

  // This forces a re-render every minute, to keep the "time ago" of the detail updated
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = setTimeout(() => setNow(Date.now()), 60000)
    return () => {
      clearTimeout(timer)
    }
  }, [now])

  const shortening = (address: string): string => (address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '')

  let data: any = null
  let description = ''
  if (type === TransactionType.DEPOSIT) {
    description = t('transaction_description.deposit')
    data = transaction.data as Deposit
  } else if (type === TransactionType.WITHDRAWAL) {
    description = t('transaction_description.withdrawal')
    data = transaction.data as Withdrawal
  } else if (type === TransactionType.PURCHASE) {
    data = transaction.data as Purchase
    const { gateway } = data as Purchase
    description = t('transaction_description.buy', {
      gateway: gatewaysNames[gateway || NetworkGatewayType.TRANSAK]
    })
  } else if (type === TransactionType.TRANSFER) {
    data = transaction.data as Transfer
    description = `${t('transaction_description.send')} ${shortening(data.to)}`
  }

  let transactionLogo = ''
  if (data != null && isPendingAccountTransaction(type, status, data.status)) {
    if (type === TransactionType.DEPOSIT || type === TransactionType.PURCHASE) {
      transactionLogo = 'in-pending-transaction-logo'
    } else {
      transactionLogo = 'out-pending-transaction-logo'
    }
  } else if (type === TransactionType.DEPOSIT || type === TransactionType.PURCHASE) {
    transactionLogo = 'in-transaction-logo'
  } else if (type === TransactionType.WITHDRAWAL || type === TransactionType.TRANSFER) {
    transactionLogo = 'out-transaction-logo'
  } else if (status === TransactionStatus.REJECTED) {
    transactionLogo = 'rejected-transaction-logo'
  }

  const handleDetailModal = () => {
    if (type === TransactionType.WITHDRAWAL && (data.status === WithdrawalStatus.PENDING || data.status === WithdrawalStatus.CHECKPOINT)) {
      onPendingWithdrawal(data.initializeHash)
    } else if (type === TransactionType.PURCHASE && status === TransactionStatus.PENDING) {
      const { network, gateway } = data as Purchase
      switch (gateway) {
        case NetworkGatewayType.MOON_PAY:
          onTransactionDetail(description, transaction)
          break
        case NetworkGatewayType.TRANSAK:
          onPendingPurchase(network, gateway)
          break
      }
    } else {
      onTransactionDetail(description, transaction)
    }
  }

  return (
    <div className="AccountTransaction" onClick={handleDetailModal}>
      <div className="type">
        <div className={`transaction-logo ${transactionLogo}`} />
      </div>
      <div className="DescriptionStatus">
        <div> {description} </div>
        <div className="status">
          <span className={`${type}-${data.status}`}>{getStatusMessage(type, status, data.status)}</span> -{' '}
          {distanceInWordsToNow(transaction.timestamp)}
        </div>
      </div>
      <div className="amount">{transaction.amount.toLocaleString()}</div>
    </div>
  )
}

export default React.memo(AccountTransaction)
