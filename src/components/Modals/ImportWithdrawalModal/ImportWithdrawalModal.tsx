import React, { ComponentProps, useState } from 'react'
import { Close, Button, Field } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Props } from './ImportWithdrawalModal.types'
import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import './ImportWithdrawalModal.css'
import { getTransactionOrigin } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { Network } from '@dcl/schemas'

const ImportWithdrawalModal = ({
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
    if (/^[0-9a-fA-Fx]{0,42}$/.test(value)) {
      setTxError(undefined)
      setTx(value)
    } else {
      setTxError(t('import_withdrawal_modal.errors.invalid_tx'))
    }
    setTx(e.target.value)
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
          onClick={handleImport}
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
