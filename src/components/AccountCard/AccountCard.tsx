import React from 'react'
import { Card } from 'decentraland-ui'
import { Props } from './AccountCard.types'
import './AccountCard.css'

const AccountCard = ({ children }: Props) => {
  return (
    <Card className="AccountCard">
      { children }
    </Card>
  )
}

export default React.memo(AccountCard)
