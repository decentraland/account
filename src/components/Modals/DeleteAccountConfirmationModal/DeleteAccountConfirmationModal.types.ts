import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'

export type DeleteAccountModalMetadata = {
  address?: string
}

export type Props = Omit<ModalProps, 'onClose' | 'metadata'> & {
  metadata: DeleteAccountModalMetadata
  onClose: () => void
}
