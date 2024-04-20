import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
ModalContext.displayName = 'ModalContext';

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ postcode: '' });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalData, setModalData }}>
            {children}
        </ModalContext.Provider>
    );
};


export const useModal = () => useContext(ModalContext);