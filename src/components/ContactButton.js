import React from 'react'
import { useModal, FORM_TYPES } from '../context/modalContext'

const ContactButton = ({ 
  formType = FORM_TYPES.GENERAL_CONTACT, 
  buttonText = 'Contact Us',
  buttonClass = 'primary-btn',
  data = null
}) => {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal({ 
      type: formType,
      data: data
    })
  }

  return (
    <button 
      onClick={handleClick}
      className={buttonClass}
      aria-label={buttonText}
    >
      {buttonText}
    </button>
  )
}

export default ContactButton 