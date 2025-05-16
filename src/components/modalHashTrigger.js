import { useEffect } from 'react'
import { useModal, FORM_TYPES } from '../context/modalContext'

const ModalHashTrigger = () => {
  const { openModal, isModalOpen } = useModal()

  useEffect(() => {
    const handleHashChange = () => {
      if (!isModalOpen) {
        if (window.location.hash === '#contact') {
          openModal({ type: FORM_TYPES.GENERAL_CONTACT })
          window.location.hash = ''
        } else if (window.location.hash === '#property-enquiry') {
          openModal({ type: FORM_TYPES.PROPERTY_ENQUIRY })
          window.location.hash = ''
        } else if (window.location.hash === '#seller') {
          openModal({ type: FORM_TYPES.PROPERTY_SELLER })
          window.location.hash = ''
        } else if (window.location.hash === '#broker') {
          openModal({ type: FORM_TYPES.BROKER_REFERRAL })
          window.location.hash = ''
        }
      }
    }

    handleHashChange() // Check on initial load

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [openModal, isModalOpen])

  return null
}

export default ModalHashTrigger
