import React from 'react';
import RootElement from './src/components/root-element';
import Layout from './src/components/layout';

export const wrapPageElement = ({element, props}) => {
    return <Layout {...props}>
        {element}</Layout>;
};
export const wrapRootElement = ({element}) => {
    return <RootElement>{element}</RootElement>;
};

// Add the onRenderBody export for Netlify forms
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    // Broker Referral Form
    <form 
      key="broker-referral-form"
      name="broker-referral" 
      netlify="true" 
      netlify-honeypot="honey_trap" 
      hidden
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="loanAmount" />
      <textarea name="message"></textarea>
      <input type="text" name="honey_trap" />
    </form>,
    
    // Property Enquiry Form
    <form 
      key="property-enquiry-form"
      name="property-enquiry" 
      netlify="true" 
      netlify-honeypot="honey_trap" 
      hidden
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="property" />
      <textarea name="message"></textarea>
      <input type="text" name="honey_trap" />
    </form>,
    
    // General Contact Form
    <form 
      key="general-contact-form"
      name="general-contact" 
      netlify="true" 
      netlify-honeypot="honey_trap" 
      hidden
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="subject" />
      <textarea name="message"></textarea>
      <input type="text" name="honey_trap" />
    </form>
  ]);
};
