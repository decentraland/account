import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../modules/modal/actions'
import { RootState } from '../../modules/reducer'

type ModalComponents = Record<string, React.ComponentType<any>>

type Props = {
  components: ModalComponents
  children: React.ReactNode
}

const ModalProvider = ({ components, children }: Props) => {
  const dispatch = useDispatch()
  const modalState = useSelector((state: RootState) => state.modal)

  return (
    <>
      {children}
      {Object.entries(components).map(([name, ModalComponent]) => {
        const state = modalState[name]
        if (!state?.open) return null
        return <ModalComponent key={name} name={name} metadata={state.metadata} onClose={() => dispatch(closeModal(name))} />
      })}
    </>
  )
}

export { ModalProvider }
