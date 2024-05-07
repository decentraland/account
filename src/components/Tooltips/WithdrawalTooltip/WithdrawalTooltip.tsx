import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Tooltip from '../Tooltip'

export default class WithdrawalTooltip extends React.PureComponent {
  render() {
    return (
      <Tooltip className="WithdrawalTooltip">
        <h1> {t('withdrawal_tooltip.header')} </h1>
        <p> {t('withdrawal_tooltip.text')} </p>
      </Tooltip>
    )
  }
}
