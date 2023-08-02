import * as React from 'react'
import { Button, Close } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { NetworkButton } from 'decentraland-dapps/dist/containers'
import { Network } from '@dcl/schemas'
import { WithdrawalStatus } from '../../../modules/mana/types'
import { FINISH_WITHDRAWAL_SUCCESS } from '../../../modules/mana/actions'
import { Props } from './WithdrawalStatusModal.types'
import WithdrawInitialized from './WithdrawInitialized'
import ReadyToWithdraw from './ReadyToWithdraw'
import CompleteWithdrawal from './CompleteWithdrawal'
import './WithdrawalStatusModal.css'

export default class WithdrawalStatusModal extends React.PureComponent<Props> {
  render() {
    const {
      name,
      onClose,
      metadata,
      withdrawals,
      transactions,
      isLoading,
      onFinishWithdrawal,
    } = this.props
    const withdrawal = withdrawals.find(
      ({ initializeHash }) => metadata.txHash === initializeHash
    )
    const finalizeTransaction = transactions.find(
      (tx) =>
        tx.actionType === FINISH_WITHDRAWAL_SUCCESS &&
        tx.payload.withdrawal.initializeHash === metadata.txHash
    )
    const isTxPending = Boolean(
      finalizeTransaction && isPending(finalizeTransaction.status)
    )

    if (!withdrawal) {
      return
    }

    const { status, amount } = withdrawal

    const handleFinishWithdrawal = () => onFinishWithdrawal(withdrawal)
    console.log({ status, isLoading, isTxPending })

    return (
      <Modal
        name={name}
        closeIcon={<Close onClick={onClose} />}
        className="WithdrawalStatusModal"
      >
        <Modal.Header>{t('withdrawal_status_modal.title')}</Modal.Header>
        <Modal.Content>
          <div className="amount_placeholder">
            {t('withdrawal_status_modal.amount_placeholder')}
          </div>
          <div className="amount">
            {amount} {t('global.mana_symbol')}
          </div>
          <div className="status">
            <div className="status_placeholder">
              {t('withdrawal_status_modal.status_placeholder')}
            </div>
            <WithdrawInitialized withdrawal={withdrawal} />
            <ReadyToWithdraw withdrawal={withdrawal} />
            <CompleteWithdrawal withdrawal={withdrawal} />
          </div>
          {status === WithdrawalStatus.COMPLETE && !isTxPending ? (
            <Button primary onClick={onClose}>
              {t('global.done')}
            </Button>
          ) : (
            <NetworkButton
              primary
              disabled={
                status === WithdrawalStatus.PENDING || isLoading || isTxPending
              }
              loading={isLoading || isTxPending}
              onClick={handleFinishWithdrawal}
              network={Network.ETHEREUM}
            >
              {t('withdrawal_status_modal.complete_withdrawal')}
            </NetworkButton>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}
