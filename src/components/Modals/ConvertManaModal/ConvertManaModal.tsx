import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fromWei } from 'web3x/utils'
import {
  Button,
  Close,
  Field,
  Header,
  Loader,
  Radio,
  Section,
} from 'decentraland-ui'
import { NetworkButton, NetworkCheck } from 'decentraland-dapps/dist/containers'
import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Network } from '@dcl/schemas'
import { Props } from './ConvertManaModal.types'
import { getEstimatedExitTransactionCost } from '../../../modules/mana/utils'
import './ConvertManaModal.css'

const MAX_APPROVAL =
  '57896044618658097711785492504343953926634992332820282019728792003956564819968'

const ConvertManaModal: React.FC<Props> = ({
  name,
  manaEth,
  manaMatic,
  onClose,
  isLoading,
  allowance,
  manaPrice,
  onManaPrice,
  onApproveMana,
  onDepositMana,
  onWithdrawMana,
  isWaitingForApproval,
  metadata: { network },
}) => {
  const [isApproved, setIsApproved] = useState(false)
  const [amount, setAmount] = useState(0)

  const handleSetAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.currentTarget.value, 10)
    if (e.currentTarget.value.length === 0) {
      setAmount(0)
    } else if (!isNaN(intValue)) {
      setAmount(intValue)
    }
  }

  const handleApprove = useCallback(() => {
    onApproveMana(MAX_APPROVAL)
    setIsApproved(!isApproved)
  }, [isApproved, onApproveMana])

  const handleConvert = useCallback(() => {
    switch (network) {
      case Network.ETHEREUM: {
        onDepositMana(amount)
        break
      }
      case Network.MATIC: {
        onWithdrawMana(amount)
        break
      }
    }
  }, [amount, network, onDepositMana, onWithdrawMana])

  const handleMax = useCallback(() => {
    if (network === Network.MATIC) {
      setAmount(manaMatic)
    } else {
      setAmount(manaEth)
    }
  }, [manaEth, manaMatic, network])

  useEffect(() => {
    onManaPrice()
    const amountAllowed = parseInt(fromWei(allowance, 'ether'), 10)
    if (!isNaN(amountAllowed) && amountAllowed > 100) {
      setIsApproved(true)
    }
  }, [allowance, onManaPrice])

  const [hasAcceptedWithdrawalCost, setHasAcceptedWithdrawalCost] =
    useState(false)
  const [txEstimatedCost, setTxEstimatedCost] = useState<number | null>()

  useEffect(() => {
    let cancel = false
    const calculateExitCost = async () => {
      try {
        const cost = await getEstimatedExitTransactionCost()
        if (!cancel) setTxEstimatedCost(cost)
      } catch (error) {
        setTxEstimatedCost(null)
      }
    }
    calculateExitCost()
    return () => {
      cancel = true
    }
  }, [])

  const isButtonLoading = isLoading || isWaitingForApproval
  const isDisabledByAmount =
    network === Network.MATIC ? manaMatic < amount : manaEth < amount
  const isButtonDisabled =
    isButtonLoading ||
    (network === Network.ETHEREUM && !isApproved) ||
    isDisabledByAmount ||
    amount <= 0

  const content = useMemo(() => {
    if (!hasAcceptedWithdrawalCost) {
      return (
        <div className="fees-warning">
          {txEstimatedCost ? (
            <T
              id="convert_mana_modal.withdrawal_cost"
              values={{
                cost: <b>{txEstimatedCost.toFixed(2)}</b>,
              }}
            />
          ) : txEstimatedCost === null ? (
            t('convert_mana_modal.withdrawal_cost_error')
          ) : (
            <Loader size="tiny" />
          )}
        </div>
      )
    }
    return (
      <>
        <Field
          label={t('convert_mana_modal.amount_label')}
          placeholder="0"
          value={amount}
          onChange={handleSetAmount}
          className="amount"
          action={t('global.max')}
          onAction={handleMax}
        />
        {isDisabledByAmount ? (
          <div className="amount-error">
            {t('convert_mana_modal.no_balance')}
          </div>
        ) : (
          <div className="usd-amount">
            {(amount * manaPrice).toFixed(2)} {t('global.usd_symbol')}
          </div>
        )}
        {network === Network.ETHEREUM ? (
          <Section className="field">
            <Header sub={true}>
              {t('convert_mana_modal.label_approvement')}
            </Header>
            <NetworkCheck network={network}>
              {(isEnabled) => (
                <Radio
                  toggle
                  checked={isApproved}
                  onChange={handleApprove}
                  disabled={isApproved || !isEnabled}
                />
              )}
            </NetworkCheck>
          </Section>
        ) : null}
        <div className="fees-warning">{t('global.fees_warning')}</div>
        <NetworkButton
          className="start-transaction-button"
          primary
          onClick={handleConvert}
          loading={isButtonLoading}
          disabled={isButtonDisabled}
          network={network}
        >
          {t(
            network === Network.ETHEREUM
              ? 'convert_mana_modal.label_button_ethereum'
              : 'convert_mana_modal.label_button_matic'
          )}
        </NetworkButton>
      </>
    )
  }, [
    amount,
    handleApprove,
    handleConvert,
    handleMax,
    hasAcceptedWithdrawalCost,
    isApproved,
    isButtonDisabled,
    isButtonLoading,
    isDisabledByAmount,
    manaPrice,
    network,
    txEstimatedCost,
  ])

  return (
    <Modal
      name={name}
      className="ConvertManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title">
          {t(
            network === Network.ETHEREUM
              ? 'convert_mana_modal.title_ethereum'
              : 'convert_mana_modal.title_matic'
          )}
        </div>
        <div className="subtitle">
          {t(
            network === Network.ETHEREUM
              ? 'convert_mana_modal.subtitle_ethereum'
              : 'convert_mana_modal.subtitle_matic'
          )}
        </div>
      </Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      {!hasAcceptedWithdrawalCost ? (
        <Modal.Actions>
          <Button onClick={onClose}>
            {t('convert_mana_modal.withdrawal_cost_cancel')}
          </Button>
          <Button primary onClick={() => setHasAcceptedWithdrawalCost(true)}>
            {t('convert_mana_modal.withdrawal_cost_accept')}
          </Button>
        </Modal.Actions>
      ) : null}
    </Modal>
  )
}

export default React.memo(ConvertManaModal)
