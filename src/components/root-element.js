import React from "react";
import { ModalProvider } from "../context/modalContext";
import { DrawerProvider } from "../context/drawerContext";
import { PropertyPreviewProvider } from "../context/propertyPreviewContext";
import PropertyPreview from "./PropertyPreview";

const RootElement = ({ children }) => {
  return (
    <ModalProvider>
      <DrawerProvider>
        <PropertyPreviewProvider>
          {children}
          <PropertyPreview />
        </PropertyPreviewProvider>
      </DrawerProvider>
    </ModalProvider>
  );
};

export default RootElement;
