import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress } from 'decentraland-ui2'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { Box, PageContainer } from './ConfirmPage.styled'
import { Props } from './ConfirmPage.types'

const ConfirmPage: React.FC<Props> = props => {
  const { isLoading, address, onValidateSubscriptionEmailRequest } = props

  const { token } = useParams<{ token: string }>()

  useEffect(() => {
    !isLoading && onValidateSubscriptionEmailRequest({ address, code: token })
  }, [isLoading, token, address])
  return (
    <PageContainer>
      <Navbar />

      <Box>
        <CircularProgress />
      </Box>

      <Footer />
    </PageContainer>
  )
}

export default React.memo(ConfirmPage)
