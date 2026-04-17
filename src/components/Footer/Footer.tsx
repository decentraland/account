import React from 'react'
import { Footer as DclFooter } from 'decentraland-ui2'

const Footer = (props: Record<string, unknown>) => <DclFooter {...(props as any)} />

export default React.memo(Footer)
