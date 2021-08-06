import React, { useState, useCallback } from 'react'
import {
  Button,
  Form,
  Message,
  ModalActions,
  ModalContent,
  ModalNavigation,
  TextAreaField,
  TextAreaProps,
} from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Props } from './EditProfileAvatarDescriptionModal.types'

const EditProfileAvatarDescriptionModal = (props: Props) => {
  const { name, avatar, address, error, isLoading, onSubmit, onClose } = props
  const [editableDescription, setEditableDescription] = useState(
    avatar?.description ?? ''
  )
  const handleDescriptionChange = useCallback(
    (_: unknown, data: TextAreaProps) =>
      setEditableDescription(data.value?.toString() ?? ''),
    [setEditableDescription]
  )

  const handleSubmit = useCallback(
    () => onSubmit(address, editableDescription),
    [editableDescription, onSubmit, address]
  )
  return (
    <Modal name={name} onClose={isLoading ? undefined : onClose} size="tiny">
      <ModalNavigation
        title={t('edit_profile_avatar_description_modal.title')}
        subtitle={t('edit_profile_avatar_description_modal.subtitle')}
        onClose={isLoading ? undefined : onClose}
      />
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          {error !== null && (
            <Message
              error
              visible={true}
              header={t('edit_profile_avatar_description_modal.error_header')}
              content={error}
            />
          )}
          <TextAreaField
            label={t('edit_profile_avatar_description_modal.description')}
            value={editableDescription}
            maxLength={150}
            onChange={handleDescriptionChange}
          />
        </ModalContent>
        <ModalActions>
          <Button
            primary
            loading={isLoading}
            disabled={editableDescription === '' || isLoading}
          >
            {t('edit_profile_avatar_description_modal.submit')}
          </Button>
        </ModalActions>
      </Form>
    </Modal>
  )
}

export default React.memo(EditProfileAvatarDescriptionModal)
