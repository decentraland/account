import * as React from 'react'

import { Icon } from 'decentraland-ui'

import { Props } from './LinkWrapper.types'

import './LinkWrapper.css'

const LinkWrapper = ({ href, children }: Props) => {
  return (
    <a className="LinkWrapper" href={href} target="_blank" rel="noreferrer">
      {children}
      <Icon name="external" size="small" />
    </a>
  )
}

export default React.memo(LinkWrapper)
