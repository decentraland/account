import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { getTransactionHref } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { ChainId, Network } from '@dcl/schemas'
import { useSelector } from 'react-redux'
import {
  Deposit,
  Purchase,
  Transaction,
  TransactionType,
  Transfer,
  Withdrawal,
} from '../../../modules/mana/types'
import { getStatusMessage } from '../../../modules/mana/utils'
import { getWithdrawals } from '../../../modules/mana/selectors'
import './TransactionDetailModal.css'

const TransactionDetailModal: React.FC<ModalProps> = ({
  name,
  onClose,
  metadata,
}) => {
  const {
    description,
    transaction,
  }: { description: string; transaction: Transaction } = metadata

  const { type, status, amount } = transaction
  let data
  let dataComponent
  switch (transaction.type) {
    case TransactionType.DEPOSIT:
      data = transaction.data as Deposit
      dataComponent = (
        <Data label={'initialize_tx'}>
          <ExplorerLink network={Network.ETHEREUM} txHash={data.hash} />
        </Data>
      )
      break
    case TransactionType.WITHDRAWAL:
      data = transaction.data as Withdrawal
      dataComponent = <WithdrawalDataComponent data={transaction.data} />
      break
    case TransactionType.PURCHASE:
      data = transaction.data as Purchase
      break
    case TransactionType.TRANSFER:
      data = transaction.data as Transfer
      dataComponent = (
        <>
          <Data label={'to'}>{data.to}</Data>
          <Data label={'tx'}>
            <ExplorerLink chainId={data.chainId} txHash={data.hash} />
          </Data>
        </>
      )
      break
  }

  const datetime = data?.timestamp
    ? new Date(data?.timestamp).toLocaleString()
    : ''

  return (
    <Modal
      name={name}
      className="TransactionDetailModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>{t('transaction_detail_modal.title')}</Modal.Header>
      <Modal.Content>
        <Data label={'operation'}>{description}</Data>
        <Data label={'datetime'}>{datetime}</Data>
        <Data label={'amount'}>{amount.toLocaleString()}</Data>
        {dataComponent}
        <Data label={'status'}>
          {data ? getStatusMessage(type, status, data.status) : ''}
        </Data>
      </Modal.Content>
    </Modal>
  )
}

type DataProps = {
  label: string
  children: React.ReactNode
}

const Data = ({ label, children }: DataProps) => {
  return (
    <div className="data">
      <div>{t(`transaction_detail_modal.${label}`)}</div>
      <div>{children}</div>
    </div>
  )
}

const WithdrawalDataComponent = ({ data }: { data: Transaction['data'] }) => {
  const withdrawals = useSelector(getWithdrawals)

  const withdrawal = React.useMemo(
    () => withdrawals.find((w) => w.initializeHash === data.initializeHash),
    [data, withdrawals]
  )

  if (!withdrawal) {
    return null
  }

  const { initializeHash, finalizeHash } = withdrawal

  return (
    <>
      <Data label={'initialize_tx'}>
        <ExplorerLink network={Network.MATIC} txHash={initializeHash} />
      </Data>
      {finalizeHash && (
        <Data label={'finalize_tx'}>
          <ExplorerLink network={Network.ETHEREUM} txHash={finalizeHash} />
        </Data>
      )}
    </>
  )
}

type ExplorerLinkProps = {
  network?: Network
  chainId?: ChainId
  txHash: string
}

const ExplorerLink = ({ network, chainId, txHash }: ExplorerLinkProps) => {
  const resolvedChainId = chainId || (network && getChainIdByNetwork(network))

  if (!resolvedChainId) {
    throw new Error(
      'At least one of network or chainId must be provided as props'
    )
  }

  const href = getTransactionHref({ txHash }, resolvedChainId)

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {txHash}
    </a>
  )
}

export default React.memo(TransactionDetailModal)
