import { Button } from 'decentraland-ui'
import * as React from 'react'
import Tooltip from '../Tooltip'
import './WithdrawalTooltip.css'

export default class WithdrawalTooltip extends React.PureComponent {
  handleGotit = () => alert('Got it')
  render() {
    return (
      <Tooltip className="WithdrawalTooltip">
        <h1> Withdraw Initialized </h1>
        <p>
          This will be a text explaining that this is a 2 step process, and when
          the checkpoint stage is done, you can finish the withdraw.
        </p>
        <Button basic onClick={this.handleGotit}>
          Got it
        </Button>
      </Tooltip>
    )
  }
}
