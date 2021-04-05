import * as React from 'react'
import './Tooltip.css'

interface Props {
  className: string
  children: React.ReactNode
}

const Tooltip: React.FC<Props> = ({ children }) => (
  <div className="Tooltip">
    <div className="tooltip-content">{children}</div>
  </div>
)

export default Tooltip
