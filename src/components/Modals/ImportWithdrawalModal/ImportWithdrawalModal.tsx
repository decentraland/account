import React, { ComponentProps, useEffect, useState } from 'react'
import { Network } from '@dcl/schemas'
import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, TextField } from 'decentraland-ui2'
import { getChainIdByNetwork } from '../../../lib/utils/eth'
import Modal from '../../../lib/utils/ModalWrapper'
import { T, t } from '../../../lib/utils/translation'
import { getTransactionHref } from '../../../modules/transaction/utils'
import { Props } from './ImportWithdrawalModal.types'

import './ImportWithdrawalModal.css'

const ImportWithdrawalModal = ({ withdrawals, address, name, isLoading, error, onClose, onImport, onClearError }: Props) => {
  const [tx, setTx] = useState('')
  const [txError, setTxError] = useState<string | undefined>()

  useEffect(() => {
    onClearError()
  }, [onClearError])

  const polygonscanHref = `${getTransactionHref({ address }, getChainIdByNetwork(Network.MATIC))}#tokentxns`

  const handleTxChange: ComponentProps<typeof TextField>['onChange'] = e => {
    const { value } = e.target
    setTx(value.trim())
  }

  const validate = () => {
    if (!/^[0-9a-fA-Fx]{66}$/.test(tx)) {
      return t('import_withdrawal_modal.errors.invalid_hash')
    } else if (withdrawals.some(w => w.initializeHash === tx)) {
      return t('import_withdrawal_modal.errors.duplicate')
    } else {
      return undefined
    }
  }

  const handleImport = () => {
    const validationError = validate()

    if (validationError) {
      setTxError(validationError)
      return
    }

    setTxError(undefined)
    onImport(tx)
  }

  return (
    <Modal
      name={name}
      className="ImportWithdrawalModal"
      closeIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
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
              )
            }}
          />
        </p>
        <TextField
          label={t('import_withdrawal_modal.tx_label')}
          placeholder="0x0000...0000"
          value={tx}
          onChange={handleTxChange}
          className="wallet"
          helperText={!isLoading ? txError || error : undefined}
          error={!isLoading && (!!txError || !!error)}
        />
        <Button className="button" variant="contained" color="primary" onClick={handleImport} disabled={isLoading}>
          {t('import_withdrawal_modal.import_withdrawal')}
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(ImportWithdrawalModal)
