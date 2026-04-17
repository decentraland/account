import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from 'decentraland-ui2'
import { closeModal } from '../../modules/modal/actions'

/**
 * ModalProps type replacing decentraland-dapps ModalProvider types.
 */
export type ModalProps = {
  name: string
  onClose: () => void
  metadata?: any
}

/**
 * Simple Modal wrapper replacing decentraland-dapps Modal container.
 * Supports compound components: Modal.Header, Modal.Content, Modal.Actions.
 */
type ModalWrapperProps = {
  name: string
  children: React.ReactNode
  onClose?: () => void
  size?: string
  className?: string
  closeIcon?: React.ReactNode
}

const ModalHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <DialogTitle className={className}>{children}</DialogTitle>
)

const ModalContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <DialogContent className={className}>{children}</DialogContent>
)

const ModalActions = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <DialogActions className={className}>{children}</DialogActions>
)

const ModalDescription = ({ children }: { children: React.ReactNode }) => <Box sx={{ px: 3, py: 1 }}>{children}</Box>

type ModalComponent = React.FC<ModalWrapperProps> & {
  Header: typeof ModalHeader
  Content: typeof ModalContent
  Actions: typeof ModalActions
  Description: typeof ModalDescription
}

const Modal: ModalComponent = ({ name, children, onClose, size }: ModalWrapperProps) => {
  const dispatch = useDispatch()
  const modalState = useSelector((state: any) => state.modal?.[name])
  const isOpen = modalState?.open ?? false

  const handleClose = () => {
    if (onClose) onClose()
    dispatch(closeModal(name))
  }

  const maxWidth = size === 'large' ? 'md' : size === 'small' ? 'xs' : 'sm'

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth={maxWidth as any} fullWidth>
      {children}
    </Dialog>
  )
}

Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Actions = ModalActions
Modal.Description = ModalDescription

export default Modal
