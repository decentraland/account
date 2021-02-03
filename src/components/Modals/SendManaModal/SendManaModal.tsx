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
  const [isManaPrice, setIsManaPrice] = useState(true)
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')

  const handleChangeManaPrice = () => {
    setIsManaPrice(!isManaPrice)
  }

  const handleSetAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.currentTarget.value, 10)
    if (e.currentTarget.value.length === 0) {
      setAmount(0)
    } else if (!isNaN(intValue)) {
      setAmount(intValue)
    }
  }

  const handleSetTo = (e: React.FormEvent<HTMLInputElement>) => {
    setTo(e.currentTarget.value)
  }

  const handleSendMana = () => {
    if (isManaPrice) {
      onSendMana(to, amount)
    } else {
      onSendMana(to, amount / manaPrice)
    }
  }

  useEffect(() => {
    onManaPrice()
  })

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
        <div className="button-group">
          <Button
            inverted
            primary
            disabled={!isManaPrice}
            onClick={handleChangeManaPrice}
          >
            {t('send_mana_modal.mana')}
          </Button>
          <Button
            inverted
            primary
            disabled={isManaPrice}
            onClick={handleChangeManaPrice}
          >
            {t('send_mana_modal.usd')}
          </Button>
        </div>
        <div className="price">
          {isManaPrice
            ? `${t('send_mana_modal.usd')}: ${amount * manaPrice}`
            : `${t('send_mana_modal.mana')}: ${amount / manaPrice}`}
        </div>
        <Field
          label={t('send_mana_modal.amount_label')}
          placeholder="0"
          value={amount}
          onChange={handleSetAmount}
        />
        <Field
          label={t('send_mana_modal.wallet_label')}
          placeholder="0x0000...0000"
          value={to}
          onChange={handleSetTo}
        />
        <Button primary onClick={handleSendMana} loading={isLoading}>
          {t('send_mana_modal.send_tokens')}
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
