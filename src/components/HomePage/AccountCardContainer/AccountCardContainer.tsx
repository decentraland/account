import * as React from 'react'

import { Props } from './AccountCardContainer.types'

import './AccountCardContainer.css'

const AccountCardContainer = ({ children }: Props) => {
  return <div className="AccountCardContainer">{children}</div>
}

export default React.memo(AccountCardContainer)
