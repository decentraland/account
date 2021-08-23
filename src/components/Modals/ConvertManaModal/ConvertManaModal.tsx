import React, { useEffect, useState } from 'react'
import { fromWei } from 'web3x-es/utils'
import { Close, Field, Header, Radio, Section } from 'decentraland-ui'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { ChainButton } from 'decentraland-dapps/dist/containers'
import ChainCheck from 'decentraland-dapps/dist/containers/ChainCheck'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Network } from '@dcl/schemas'
import { Props } from './ConvertManaModal.types'
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

  const handleApprove = () => {
    onApproveMana(MAX_APPROVAL)
    setIsApproved(!isApproved)
  }

  const handleConvert = () => {
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
    const amountAllowed = parseInt(fromWei(allowance, 'ether'), 10)
    if (!isNaN(amountAllowed) && amountAllowed > 100) {
      setIsApproved(true)
    }
  }, [allowance])

  const chainId = getChainIdByNetwork(network)

  const isButtonLoading = isLoading || isWaitingForApproval
  const isDisabledByAmount =
    network === Network.MATIC ? manaMatic < amount : manaEth < amount
  const isButtonDisabled =
    isButtonLoading ||
    (network === Network.ETHEREUM && !isApproved) ||
    isDisabledByAmount ||
    amount <= 0

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
      <Modal.Content>
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
            <ChainCheck chainId={chainId}>
              {isEnabled => (
                <Radio
                  toggle
                  checked={isApproved}
                  onChange={handleApprove}
                  disabled={isApproved || !isEnabled}
                />
              )}
            </ChainCheck>
          </Section>
        ) : null}
        <div className="fees-warning">{t('global.fees_warning')}</div>
        <ChainButton
          primary
          onClick={handleConvert}
          loading={isButtonLoading}
          disabled={isButtonDisabled}
          chainId={chainId}
        >
          {t(
            network === Network.ETHEREUM
              ? 'convert_mana_modal.label_button_ethereum'
              : 'convert_mana_modal.label_button_matic'
          )}
        </ChainButton>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(ConvertManaModal)
