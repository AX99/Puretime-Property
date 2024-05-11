import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();
ModalContext.displayName = "ModalContext";

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ postcode: "" });

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const openModal = () => setIsModalOpen(true);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, toggleModal, modalData, setModalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
