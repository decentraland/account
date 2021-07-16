import React, { useState, useCallback } from 'react'
import {
  Button,
  Field,
  Form,
  InputOnChangeData,
  ModalActions,
  ModalContent,
  ModalNavigation,
} from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Props } from './EditProfileAvatarDescriptionModal.types'

const EditProfileAvatarDescriptionModal = (props: Props) => {
  const { name, avatar, isLoading, onSubmit, onClose } = props
  const [editableDescription, setEditableDescription] = useState(
    avatar?.description ?? ''
  )
  const handleDescriptionChange = useCallback(
    (_: unknown, data: InputOnChangeData) => setEditableDescription(data.value),
    [setEditableDescription]
  )

  const handleSubmit = useCallback(() => onSubmit(editableDescription), [
    editableDescription,
  ])
  return (
    <Modal name={name} onClose={onClose} size="tiny">
      <ModalNavigation
        title={t('edit_profile_avatar_description_modal.title')}
        subtitle={t('edit_profile_avatar_description_modal.subtitle')}
        onClose={onClose}
      />
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          <Field
            label={t('edit_profile_avatar_description_modal.description')}
            value={editableDescription}
            onChange={handleDescriptionChange}
          />
        </ModalContent>
        <ModalActions>
          <Button
            primary
            loading={isLoading}
            disabled={editableDescription === ''}
          >
            {t('edit_profile_avatar_description_modal.submit')}
          </Button>
        </ModalActions>
      </Form>
    </Modal>
  )
}

export default React.memo(EditProfileAvatarDescriptionModal)
