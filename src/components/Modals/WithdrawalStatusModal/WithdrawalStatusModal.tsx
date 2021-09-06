import * as React from 'react'
import { Button, Close, Radio } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import {
  getTransactionHref,
  isPending,
} from 'decentraland-dapps/dist/modules/transaction/utils'
import { ChainButton } from 'decentraland-dapps/dist/containers'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { Network } from '@dcl/schemas'
import { WithdrawalStatus } from '../../../modules/mana/types'
import { FINISH_WITHDRAWAL_SUCCESS } from '../../../modules/mana/actions'
import { Props } from './WithdrawalStatusModal.types'
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
    const withdrawal = withdrawals.find(({ initializeHash }) => metadata.txHash === initializeHash)
    const finalizeTransaction = transactions.find(
      (tx) =>
        tx.actionType === FINISH_WITHDRAWAL_SUCCESS &&
        tx.payload.withdrawal.hash === metadata.txHash
    )
    const isTxPending = Boolean(
      finalizeTransaction && isPending(finalizeTransaction.status)
    )

    if (!withdrawal) {
      return
    }

    const { status, amount } = withdrawal

    const handleFinishWithdrawal = () => onFinishWithdrawal(withdrawal)

    const initializeHref = getTransactionHref(
      { txHash: withdrawal.initializeHash },
      getChainIdByNetwork(Network.MATIC)
    )

    const finalizeHref =
      withdrawal.finalizeHash &&
      getTransactionHref(
        { txHash: withdrawal.finalizeHash },
        getChainIdByNetwork(Network.ETHEREUM)
      )

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
            <a
              style={{ fontWeight: 'unset', color: 'unset' }}
              href={initializeHref}
              target="_blank"
              rel="noreferrer"
            >
              <Radio
                checked={true}
                label={t('withdrawal_status_modal.status_initialized')}
              />
            </a>
            <Radio
              checked={true}
              className={
                status === WithdrawalStatus.CHECKPOINT ||
                status === WithdrawalStatus.COMPLETE
                  ? ''
                  : 'yellow_check'
              }
              label={t('withdrawal_status_modal.status_checkpoint')}
            />
            <div className="status_checkpoint_placeholder">
              {t('withdrawal_status_modal.status_checkpoint_placeholder')}
            </div>
            {finalizeHref ? (
              <a
                style={{ fontWeight: 'unset' }}
                href={finalizeHref}
                target="_blank"
                rel="noreferrer"
              >
                <Radio
                  checked={status === WithdrawalStatus.COMPLETE}
                  label={t('withdrawal_status_modal.status_completed')}
                />
              </a>
            ) : (
              <Radio
                checked={status === WithdrawalStatus.COMPLETE}
                label={t('withdrawal_status_modal.status_completed')}
              />
            )}
          </div>
          {status === WithdrawalStatus.COMPLETE && !isTxPending ? (
            <Button primary onClick={onClose}>
              {t('global.done')}
            </Button>
          ) : (
            <ChainButton
              primary
              disabled={
                status === WithdrawalStatus.PENDING || isLoading || isTxPending
              }
              loading={isLoading || isTxPending}
              onClick={handleFinishWithdrawal}
              chainId={getChainIdByNetwork(Network.ETHEREUM)}
            >
              {t('withdrawal_status_modal.complete_withdrawal')}
            </ChainButton>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}
