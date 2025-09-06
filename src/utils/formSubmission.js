/**
 * Form submission utilities for handling different form types
 * using Netlify Forms as the backend
 */

/**
 * Submit form data to Netlify Forms
 * @param {Object} formData - The form data to submit
 * @param {string} formName - The name of the form (must match form name attribute)
 * @returns {Promise} - The response from the form submission
 */
export const submitToNetlify = async (formData, formName) => {
  // Encode form data for Netlify
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }
  
  // Add form-name field that Netlify requires
  const dataWithFormName = {
    ...formData,
    "form-name": formName,
  };
  
  try {
    // Submit to Netlify Forms
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(dataWithFormName)
    });
    
    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`);
    }
    
    return {
      success: true,
      message: "Thank you for your submission!"
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: error.message || "Error submitting form. Please try again."
    };
  }
};

/**
 * Submit broker referral form
 * @param {Object} formData - The form data
 * @returns {Promise} - The form submission response
 */
export const submitBrokerReferralForm = (formData) => {
  return submitToNetlify(formData, "broker-referral");
};

/**
 * Submit property enquiry form
 * @param {Object} formData - The form data
 * @returns {Promise} - The form submission response
 */
export const submitPropertyEnquiryForm = (formData) => {
  return submitToNetlify(formData, "property-enquiry");
};

/**
 * Submit general contact form
 * @param {Object} formData - The form data
 * @returns {Promise} - The form submission response
 */
export const submitGeneralContactForm = (formData) => {
  return submitToNetlify(formData, "general-contact");
};

/**
 * Submit property management form
 * @param {Object} formData - The form data
 * @returns {Promise} - The form submission response
 */
export const submitPropertyManagementForm = (formData) => {
  return submitToNetlify(formData, "property-management");
}; 