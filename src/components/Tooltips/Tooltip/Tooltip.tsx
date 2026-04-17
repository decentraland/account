import * as React from 'react'
import { Button } from 'decentraland-ui2'
import { t } from '../../../lib/utils/translation'

import './Tooltip.css'

interface Props {
  className: string
  children: React.ReactNode
}

const Tooltip: React.FC<Props> = ({ children }) => {
  const [isHidden, setHidden] = React.useState(false)
  const handleGotit = () => setHidden(true)
  return (
    <div className={isHidden ? 'Tooltip tooltip-hidden' : 'Tooltip'}>
      <div className="tooltip-content">
        {children}
        <Button variant="text" onClick={handleGotit}>
          {t('tooltip.button')}
        </Button>
      </div>
    </div>
  )
}

export default Tooltip
