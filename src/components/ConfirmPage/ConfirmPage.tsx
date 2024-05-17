import React, { useEffect } from 'react'
import { CircularProgress } from 'decentraland-ui2'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { Box, PageContainer } from './ConfirmPage.styled'
import { Props } from './ConfirmPage.types'

const ConfirmPage: React.FC<Props> = props => {
  const { isLoading, onValidateSubscriptionEmailRequest } = props

  useEffect(() => {
    // !isLoading && onValidateSubscriptionEmailRequest({})
  }, [isLoading])
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
