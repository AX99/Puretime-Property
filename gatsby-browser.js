import React from 'react';

import "./src/styles/global.css";
import RootElement from './src/components/root-element';
import Layout from './src/components/layout';

export const wrapPageElement = ({element, props}) => {
    if (props.location.pathname.startsWith('/blog')) {
        return element;
    }
    return <Layout {...props}>
        {element}</Layout>;
};
export const wrapRootElement = ({element}) => {
    return <RootElement>{element}</RootElement>;
};
