import { Network } from '@dcl/schemas'
import { NetworkButton } from 'decentraland-dapps/dist/containers'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close, Loader } from 'decentraland-ui'
import { useWithdrawalCost } from '../../../hooks'
import { FINISH_WITHDRAWAL_SUCCESS } from '../../../modules/mana/actions'
import { WithdrawalStatus } from '../../../modules/mana/types'
import CompleteWithdrawal from './CompleteWithdrawal'
import ReadyToWithdraw from './ReadyToWithdraw'
import { Props } from './WithdrawalStatusModal.types'
import WithdrawInitialized from './WithdrawInitialized'

import './WithdrawalStatusModal.css'

export default function WithdrawalStatusModal({
  name,
  onClose,
  metadata,
  withdrawals,
  transactions,
  isLoading,
  onFinishWithdrawal
}: Props): JSX.Element | null {
  const [cost, isLoadingCost] = useWithdrawalCost()
  const withdrawal = withdrawals.find(({ initializeHash }) => metadata.txHash === initializeHash)
  const finalizeTransaction = transactions.find(
    tx => tx.actionType === FINISH_WITHDRAWAL_SUCCESS && tx.payload.withdrawal.initializeHash === metadata.txHash
  )
  const isTxPending = Boolean(finalizeTransaction && isPending(finalizeTransaction.status))

  if (!withdrawal) {
    return null
  }

  const { status, amount } = withdrawal

  const isReadyToWithdraw = status === WithdrawalStatus.CHECKPOINT || status === WithdrawalStatus.COMPLETE

  const handleFinishWithdrawal = () => onFinishWithdrawal(withdrawal)

  return (
    <Modal name={name} closeIcon={<Close onClick={onClose} />} className="WithdrawalStatusModal">
      <Modal.Header>{t('withdrawal_status_modal.title')}</Modal.Header>
      <Modal.Content>
        <div className="amount_placeholder">{t('withdrawal_status_modal.amount_placeholder')}</div>
        <div className="amount">
          {amount} {t('global.mana_symbol')}
        </div>
        <div className="status">
          <div className="status_placeholder">{t('withdrawal_status_modal.status_placeholder')}</div>
          <WithdrawInitialized withdrawal={withdrawal} />
          <ReadyToWithdraw isReadyToWithdraw={isReadyToWithdraw} />
          <CompleteWithdrawal withdrawal={withdrawal} />
        </div>

        {isReadyToWithdraw ? (
          isLoadingCost ? (
            <div className="withdrawal_cost_loader">
              <Loader size="tiny" inline />
            </div>
          ) : (
            <div className="withdrawal_cost">
              <>
                {t('withdrawal_status_modal.withdrawal_cost', {
                  cost: cost ?? t('global.unknown'),
                  bold: (text: string) => <b>{text}</b>
                })}
                <br />
                {t('withdrawal_status_modal.withdrawal_cost_explanation')}
              </>
            </div>
          )
        ) : null}
        {status === WithdrawalStatus.COMPLETE && !isTxPending ? (
          <Button primary onClick={onClose}>
            {t('global.done')}
          </Button>
        ) : (
          <NetworkButton
            primary
            disabled={status === WithdrawalStatus.PENDING || isLoading || isTxPending}
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
