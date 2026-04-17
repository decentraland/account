import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { usePageTracking } from '@dcl/hooks'
import { closeAllModals } from '../../modules/modal/actions'
import { ModalProvider } from '../ModalProvider'
import * as modals from '../Modals'

const AppLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  usePageTracking(location.pathname)

  useEffect(() => {
    dispatch(closeAllModals())
  }, [location.pathname, dispatch])

  return (
    <ModalProvider components={modals}>
      <Outlet />
    </ModalProvider>
  )
}

export { AppLayout }
