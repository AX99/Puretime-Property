import React, { createContext, useContext, useState, useEffect } from 'react'

const ModalContext = createContext({})
ModalContext.displayName = 'ModalContext'

export const FORM_TYPES = {
  PROPERTY_SELLER: 'propertySeller',
  BROKER_REFERRAL: 'brokerReferral',
  PROPERTY_ENQUIRY: 'propertyEnquiry',
  GENERAL_CONTACT: 'generalContact'
}

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formType, setFormType] = useState(FORM_TYPES.PROPERTY_SELLER)
  const [modalData, setModalData] = useState({ postcode: '' })

  const toggleModal = (options = {}) => {
    const { data = null, type = FORM_TYPES.PROPERTY_SELLER } = options;
    setIsModalOpen(!isModalOpen)
    if (data) setModalData(data)
    setFormType(type)
  }
  
  const openModal = (options = {}) => {
    const { data = null, type = FORM_TYPES.PROPERTY_SELLER } = options;
    setIsModalOpen(true)
    if (data) setModalData(data)
    setFormType(type)
  }
  
  // Add this function to window object to make it accessible globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.openContactModal = (options = {}) => {
        const { data = null, type = FORM_TYPES.PROPERTY_SELLER } = options;
        setIsModalOpen(true)
        if (data) setModalData(data)
        setFormType(type)
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.openContactModal
      }
    }
  }, [])

  return (
    <ModalContext.Provider value={{ 
      isModalOpen, 
      toggleModal, 
      openModal, 
      modalData, 
      setModalData,
      formType
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
