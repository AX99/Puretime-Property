import React from "react";
import { ModalProvider } from "../context/modalContext";
import { DrawerProvider } from "../context/drawerContext";

const RootElement = ({ children }) => {
  return (
    <ModalProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </ModalProvider>
  );
};

export default RootElement;
