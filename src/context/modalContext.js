import React, { createContext, useContext, useState, useEffect } from 'react'

const ModalContext = createContext({})
ModalContext.displayName = 'ModalContext'

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ postcode: '' })

  const toggleModal = (data = null) => {
    setIsModalOpen(!isModalOpen)
    if (data) setModalData(data)
  }
  
  const openModal = (data = null) => {
    setIsModalOpen(true)
    if (data) setModalData(data)
  }
  
  // Add this function to window object to make it accessible globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.openContactModal = (data = null) => {
        setIsModalOpen(true)
        if (data) setModalData(data)
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.openContactModal
      }
    }
  }, [])

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal, openModal, modalData, setModalData }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
