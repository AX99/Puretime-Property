import React from 'react';

import "./src/styles/global.css";
import RootElement from './src/components/root-element';
import Layout from './src/components/layout';

export const wrapPageElement = ({element, props}) => {
    return <Layout {...props}>
        {element}</Layout>;
};
export const wrapRootElement = ({element}) => {
    return <RootElement>{element}</RootElement>;
};
