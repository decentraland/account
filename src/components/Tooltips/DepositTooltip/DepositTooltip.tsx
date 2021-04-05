import { Button } from 'decentraland-ui'
import * as React from 'react'
import Tooltip from '../Tooltip'
import './DepositTooltip.css'

export default class DepositTooltip extends React.PureComponent {
  handleGotit = () => alert('Got it')
  render() {
    return (
      <Tooltip className="DepositTooltip">
        <h1> Deposit Initialized </h1>
        <p>
          This will be a text explaining that this process can take more than 20
          minutes.
        </p>
        <Button basic onClick={this.handleGotit}>
          Got it
        </Button>
      </Tooltip>
    )
  }
}
