import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import { Button, Close, Field, Loader } from 'decentraland-ui'
import { ContractName } from 'decentraland-transactions'
import { withAuthorizedAction } from 'decentraland-dapps/dist/containers'
import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Contract, Network } from '@dcl/schemas'
import { AuthorizedAction } from 'decentraland-dapps/dist/containers/withAuthorizedAction/AuthorizationModal'
import { AuthorizationType } from 'decentraland-dapps/dist/modules/authorization/types'
import { ERC20_PREDICATE_CONTRACT_ADDRESS } from '../../../modules/mana/utils'
import {
  MANA_CONTRACT_ADDRESS,
  getEstimatedExitTransactionCost,
} from '../../../modules/mana/utils'
import { getDepositManaStatus, getError } from '../../../modules/mana/selectors'
import { Props } from './ConvertManaModal.types'
import './ConvertManaModal.css'

const ConvertManaModal: React.FC<Props> = ({
  name,
  manaEth,
  manaMatic,
  wallet,
  onClose,
  isLoading,
  manaPrice,
  onManaPrice,
  onDepositMana,
  onWithdrawMana,
  onAuthorizedAction,
  metadata: { network },
}) => {
  const [amount, setAmount] = useState(0)

  const handleSetAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.currentTarget.value, 10)
    if (e.currentTarget.value.length === 0) {
      setAmount(0)
    } else if (!isNaN(intValue)) {
      setAmount(intValue)
    }
  }

  const handleConvert = useCallback(() => {
    switch (network) {
      case Network.ETHEREUM: {
        const manaContract = {
          name: ContractName.MANAToken,
          address: MANA_CONTRACT_ADDRESS,
          network,
          chainId: wallet?.chainId,
        } as Contract

        onAuthorizedAction({
          authorizationType: AuthorizationType.ALLOWANCE,
          authorizedAddress: ERC20_PREDICATE_CONTRACT_ADDRESS,
          authorizedContractLabel: 'ERC20 Predicate',
          targetContract: manaContract,
          targetContractName: ContractName.MANAToken,
          requiredAllowanceInWei: ethers.utils
            .parseEther(amount.toString())
            .toString(),
          onAuthorized: () => onDepositMana(amount),
        })
        break
      }
      case Network.MATIC: {
        onWithdrawMana(amount)
        break
      }
    }
  }, [
    amount,
    network,
    wallet?.chainId,
    onDepositMana,
    onWithdrawMana,
    onAuthorizedAction,
  ])

  const handleMax = useCallback(() => {
    if (network === Network.MATIC) {
      setAmount(manaMatic)
    } else {
      setAmount(manaEth)
    }
  }, [manaEth, manaMatic, network])

  useEffect(() => {
    onManaPrice()
  }, [onManaPrice])

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
        setHasAcceptedWithdrawalCost(true)
        setTxEstimatedCost(null)
      }
    }
    calculateExitCost()
    return () => {
      cancel = true
    }
  }, [])

  const isButtonLoading = isLoading
  const isDisabledByAmount =
    network === Network.MATIC ? manaMatic < amount : manaEth < amount
  const isButtonDisabled =
    isButtonLoading ||
    isDisabledByAmount ||
    amount <= 0 ||
    wallet?.network !== network

  const content = useMemo(() => {
    if (!hasAcceptedWithdrawalCost) {
      return (
        <div className="fees-warning">
          {txEstimatedCost ? (
            <T
              id="convert_mana_modal.withdrawal_cost"
              values={{
                cost: <b>${txEstimatedCost.toFixed(2)}</b>,
              }}
            />
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
        <div className="fees-warning">{t('global.fees_warning')}</div>
        <Button
          className="start-transaction-button"
          primary
          onClick={handleConvert}
          loading={isButtonLoading}
          disabled={isButtonDisabled}
        >
          {t(
            network === Network.ETHEREUM
              ? 'convert_mana_modal.label_button_ethereum'
              : 'convert_mana_modal.label_button_matic'
          )}
        </Button>
      </>
    )
  }, [
    amount,
    handleConvert,
    handleMax,
    hasAcceptedWithdrawalCost,
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

export default React.memo(
  withAuthorizedAction(
    ConvertManaModal,
    AuthorizedAction.SWAP_MANA,
    {
      title_action: 'convert_mana_modal.authorization.title_action',
      action: 'convert_mana_modal.authorization.action',
      confirm_transaction: {
        title: 'convert_mana_modal.authorization.confirm_transaction_title',
      },
      set_cap: {
        description: 'convert_mana_modal.authorization.set_cap_description'
      },
      authorize_mana: {
        description: 'convert_mana_modal.authorization.authorize_mana_description'
      }
    },
    getDepositManaStatus,
    getError
  )
)
