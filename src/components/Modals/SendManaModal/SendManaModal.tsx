import React, { useEffect, useState } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close, Field } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Props } from './SendManaModal.types'
import './SendManaModal.css'

const TransactionDetailModal: React.FC<Props> = ({
  name,
  onClose,
  isLoading,
  manaPrice,
  onManaPrice,
  onSendMana
}) => {
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')
  const [errors, setErrors] = useState({
    amount: { hasError: false, message: '' },
    to: { hasError: false, message: '' }
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
        to: { hasError: false, message: '' }
      })
      setTo(value)
    } else {
      setErrors({
        ...errors,
        to: {
          hasError: true,
          message: t('send_mana_modal.errors.invalid_char')
        }
      })
    }
  }

  const handleSendMana = () => {
    const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(to)
    if (isValidAddress) {
      onSendMana(to, amount)
    } else {
      setErrors({
        ...errors,
        to: {
          hasError: true,
          message: t('send_mana_modal.errors.invalid_address')
        }
      })
    }
  }

  useEffect(() => {
    onManaPrice()
  }, [])

  return (
    <Modal
      name={name}
      className="SendManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> {t('send_mana_modal.send_tokens')} </div>
        <div className="subtitle"> {t('send_mana_modal.subtitle')} </div>
      </Modal.Header>
      <Modal.Content>
        <Field
          label={t('send_mana_modal.amount_label')}
          placeholder="0"
          value={amount}
          onChange={handleSetAmount}
          className="amount"
          message={errors.amount.message}
          error={errors.amount.hasError}
        />
        <div className="usd-amount">
          {(amount * manaPrice).toFixed(2)} {t('global.usd_symbol')}
        </div>
        <Field
          label={t('send_mana_modal.wallet_label')}
          placeholder="0x0000...0000"
          value={to}
          onChange={handleSetTo}
          className="wallet"
          message={errors.to.message}
          error={errors.to.hasError}
        />
        <Button primary onClick={handleSendMana} loading={isLoading}>
          {t('send_mana_modal.send_tokens')}
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
