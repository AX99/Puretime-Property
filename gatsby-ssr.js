
import React from 'react';
import { ModalProvider } from './src/context/modalContext';

export const wrapRootElement = ({ element }) => {
    return <ModalProvider>{element}</ModalProvider>;
};

export const onRenderBody = ({ setHtmlAttributes }) => {
    setHtmlAttributes({ lang: "en-GB" });
};