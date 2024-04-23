import "./src/styles/global.css";

import React from 'react';
import { ModalProvider } from './src/context/modalContext';

export const wrapRootElement = ({ element }) => {
    return <ModalProvider>{element}</ModalProvider>;
};