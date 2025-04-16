import React, { createContext, useContext, useState } from "react";

const DrawerContext = createContext();
DrawerContext.displayName = "DrawerContext";

export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const openDrawer = () => setDrawerOpen(true);

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer, openDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
