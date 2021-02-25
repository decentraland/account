import React, { useEffect, useState } from 'react'
import { toBN } from 'web3x-es/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close, Field, Header, Radio, Section } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Props } from './ConvertToMaticManaModal.types'
import './ConvertToMaticManaModal.css'

const ConvertToMaticManaModal: React.FC<Props> = ({
  name,
  onClose,
  isLoading,
  allowance,
  manaPrice,
  onManaPrice,
  onApproveMana,
  onGetApprovedMana,
  onDepositMana,
  isWaitingApprovement,
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
  const getMaximumValue = () => toBN(2).pow(toBN(255))

  const handleApprove = () => {
    onApproveMana(getMaximumValue().toString())
    setIsApproved(!isApproved)
  }

  const handleConvert = () => {
    onDepositMana(amount)
  }

  useEffect(() => {
    onManaPrice()
    onGetApprovedMana()
    const amountAllowed = parseInt(allowance, 10)
    if (!isNaN(amountAllowed) && amountAllowed > 100) {
      setIsApproved(true)
    }
  }, [allowance])

  return (
    <Modal
      name={name}
      className="SendManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> {t('convert_to_matic_modal.title')} </div>
        <div className="subtitle"> {t('convert_to_matic_modal.subtitle')} </div>
      </Modal.Header>
      <Modal.Content>
        <Field
          label={t('convert_to_matic_modal.amount_label')}
          placeholder="0"
          value={amount}
          onChange={handleSetAmount}
          className="amount"
        />
        <div className="usd-amount">
          {(amount * manaPrice).toFixed(2)} {t('global.usd_symbol')}
        </div>
        <Section className="field">
          <Header sub={true}>
            {t('convert_to_matic_modal.label_approvement')}
          </Header>
          <Radio
            toggle
            checked={isApproved}
            onChange={handleApprove}
            disabled={isApproved}
          />
        </Section>

        <Button
          primary
          onClick={handleConvert}
          loading={isLoading || isWaitingApprovement}
          disabled={!isApproved}
        >
          {t('convert_to_matic_modal.label_button')}
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(ConvertToMaticManaModal)
