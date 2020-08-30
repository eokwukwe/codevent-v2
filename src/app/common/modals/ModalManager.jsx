import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from 'features/auth/LoginForm'
import SignupForm from 'features/auth/SignupForm'

export default function ModalManager() {
  const modalLookup = { LoginForm, SignupForm }

  const currentModal = useSelector(state => state.modals)

  let renderedModal

  if (currentModal) {
    const { modalType, modalProps } = currentModal
    const ModalComponent = modalLookup[modalType]

    renderedModal = <ModalComponent {...modalProps} />
  }

  return <span>{renderedModal}</span>
}
