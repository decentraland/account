import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Props } from './LinkWrapper.types'

import './LinkWrapper.css'

const LinkWrapper = ({ href, children }: Props) => {
  return (
    <a className="LinkWrapper" href={href} target="_blank" rel="noreferrer">
      {children}
      <OpenInNewIcon fontSize="small" />
    </a>
  )
}

export default React.memo(LinkWrapper)
