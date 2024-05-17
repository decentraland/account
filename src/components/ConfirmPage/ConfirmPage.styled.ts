import styled from '@emotion/styled'
import { Box as BoxMui } from 'decentraland-ui2'
import backgroundMobile from '../../images/background-mobile.webp'
import background from '../../images/background.webp'

export const PageContainer = styled('div')({
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100vw',
  minHeight: '100vh',
  position: 'relative',
  '@media (max-width: 991px)': { backgroundImage: `url(${backgroundMobile})` }
})

export const Box = styled(BoxMui)({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh'
})
