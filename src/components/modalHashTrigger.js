import React, { useEffect } from "react";
import { useModal } from "../context/modalContext";

const ModalHashTrigger = () => {
  const { toggleModal, isModalOpen } = useModal();

  useEffect(() => {
    const handleHashChange = () => {
      if (!isModalOpen && window.location.hash === "#contact") {
        toggleModal();
        window.location.hash = "";
      }
    };

    handleHashChange(); // Check on initial load

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [toggleModal, isModalOpen]);

  return null;
};

export default ModalHashTrigger;
