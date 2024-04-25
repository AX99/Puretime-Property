import React from "react";
import { ModalProvider } from "../context/modalContext";

const RootElement = ({ children }) => {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
};

export default RootElement;