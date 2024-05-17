import styled from '@emotion/styled'
import { Box as BoxMui } from 'decentraland-ui2'
import background from '../../images/background.webp'

export const PageContainer = styled('div')({
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100vw',
  minHeight: '100vh',
  position: 'relative'
})

export const Box = styled(BoxMui)({
  flexGrow: 1,
  display: 'flex',
  '@media (max-width: 991px)': { flexDirection: 'column', alignItems: 'center' }
})
