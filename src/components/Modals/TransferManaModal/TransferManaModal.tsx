import React, { useEffect, useState } from 'react'
import { Close, Field } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { ChainButton } from 'decentraland-dapps/dist/containers'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Network } from '@dcl/schemas'
import { Props } from './TransferManaModal.types'
import './TransferManaModal.css'

const TransferManaModal: React.FC<Props> = ({
  name,
  manaEth,
  manaMatic,
  onClose,
  isLoading,
  manaPrice,
  onManaPrice,
  onTransferMana,
  metadata: { network },
}) => {
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')
  const [errors, setErrors] = useState({
    amount: { hasError: false, message: '' },
    to: { hasError: false, message: '' },
  })

  const handleSetAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.currentTarget.value, 10)
    if (e.currentTarget.value.length === 0) {
      setAmount(0)
    } else if (!isNaN(intValue)) {
      setAmount(intValue)
    }
  }

  const handleSetTo = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    const isValid = /^[0-9a-fA-Fx]{0,42}$/.test(value)
    if (isValid) {
      setErrors({
        ...errors,
        to: { hasError: false, message: '' },
      })
      setTo(value)
    } else {
      setErrors({
        ...errors,
        to: {
          hasError: true,
          message: t('transfer_mana_modal.errors.invalid_char'),
        },
      })
    }
  }

  const handleTransferMana = () => {
    const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(to)
    if (isValidAddress) {
      onTransferMana(to, amount, network)
    } else {
      setErrors({
        ...errors,
        to: {
          hasError: true,
          message: t('transfer_mana_modal.errors.invalid_address'),
        },
      })
    }
  }

  const handleMax = () => {
    if (network === Network.MATIC) {
      setAmount(manaMatic)
    } else {
      setAmount(manaEth)
    }
  }

  useEffect(() => {
    onManaPrice()
  }, [])

  const isDisabledByAmount =
    network === Network.MATIC ? manaMatic < amount : manaEth < amount

  return (
    <Modal
      name={name}
      className="TransferManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> {t('transfer_mana_modal.send_tokens')} </div>
        <div className="subtitle"> {t('transfer_mana_modal.subtitle')} </div>
      </Modal.Header>
      <Modal.Content>
        <Field
          label={t('transfer_mana_modal.amount_label')}
          placeholder="0"
          value={amount}
          onChange={handleSetAmount}
          className="amount"
          message={errors.amount.message}
          error={errors.amount.hasError}
          action={t('global.max')}
          onAction={handleMax}
        />
        {isDisabledByAmount ? (
          <div className="amount-error">
            {t('transfer_mana_modal.no_balance')}
          </div>
        ) : (
          <div className="usd-amount">
            {(amount * manaPrice).toFixed(2)} {t('global.usd_symbol')}
          </div>
        )}
        <Field
          label={t('transfer_mana_modal.wallet_label')}
          placeholder="0x0000...0000"
          value={to}
          onChange={handleSetTo}
          className="wallet"
          message={errors.to.message}
          error={errors.to.hasError}
        />
        <div className="fees-warning">
          {network === Network.ETHEREUM ? t('global.fees_warning') : null}
        </div>
        <ChainButton
          primary
          onClick={handleTransferMana}
          loading={isLoading}
          disabled={amount <= 0 || isDisabledByAmount}
          chainId={getChainIdByNetwork(network as Network)}
        >
          {t('transfer_mana_modal.send_tokens')}
        </ChainButton>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransferManaModal)
