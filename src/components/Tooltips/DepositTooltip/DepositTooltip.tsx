import * as React from 'react'

import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import Tooltip from '../Tooltip'

export default class DepositTooltip extends React.PureComponent {
  render() {
    return (
      <Tooltip className="DepositTooltip">
        <h1> {t('deposit_tooltip.header')} </h1>
        <p> {t('deposit_tooltip.text')} </p>
      </Tooltip>
    )
  }
}
