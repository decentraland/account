import React, { ComponentProps, useState } from 'react'
import { Close, Button, Field } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import { getTransactionOrigin } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { Network } from '@dcl/schemas'
import { Props } from './ImportWithdrawalModal.types'

import './ImportWithdrawalModal.css'

const ImportWithdrawalModal = ({
  withdrawals,
  address,
  name,
  isLoading,
  onClose,
}: Props) => {
  const [tx, setTx] = useState('')
  const [txError, setTxError] = useState<string | undefined>()

  // TODO: Create a util in decentraland-dapps that provides this
  const polygonscanHref = `${getTransactionOrigin(
    getChainIdByNetwork(Network.MATIC)
  )}/address/${address}#tokentxns`

  const handleTxChange: ComponentProps<typeof Field>['onChange'] = (e) => {
    const { value } = e.target
    setTx(value)
  }

  const validate = () => {
    if (!tx) {
      return t('import_withdrawal_modal.errors.required_field')
    } else if (withdrawals.some((w) => w.initializeHash === tx)) {
      return t('import_withdrawal_modal.errors.duplicate')
    } else {
      return undefined
    }
  }

  const handleImport = () => {}

  return (
    <Modal
      name={name}
      className="ImportWithdrawalModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title">{t('import_withdrawal_modal.title')} </div>
      </Modal.Header>
      <Modal.Content>
        <p className="description">
          <T
            id="import_withdrawal_modal.description"
            values={{
              link: (
                <a href={polygonscanHref} target="_blank" rel="noreferrer">
                  {t('import_withdrawal_modal.polygonscan')}
                </a>
              ),
            }}
          />
        </p>
        <Field
          label={t('import_withdrawal_modal.tx_label')}
          placeholder="0x0000...0000"
          value={tx}
          onChange={handleTxChange}
          className="wallet"
          message={txError}
          error={!!txError}
        />
        <Button
          className="button"
          primary
          onClick={() => {
            const error = validate()
            if (error) {
              setTxError(error)
            } else {
              setTxError(undefined)
              handleImport()
            }
          }}
          loading={isLoading}
          disabled={isLoading}
        >
          {t('import_withdrawal_modal.import_withdrawal')}
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(ImportWithdrawalModal)
