import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './Data.types'
import './Data.css'

const Data = ({ label, children }: Props) => {
  return (
    <div className="Data">
      <div>{t(`transaction_detail_modal.${label}`)}</div>
      <div>{children}</div>
    </div>
  )
}

export default React.memo( Data)
