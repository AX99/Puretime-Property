import React, { useState, useEffect, useRef } from 'react'
import addtoMailchimp from 'gatsby-plugin-mailchimp'
import { motion, AnimatePresence } from 'framer-motion'
import { useModal } from '../context/modalContext'
import { FORM_TYPES } from '../context/modalContext'
import { 
  submitBrokerReferralForm, 
  submitPropertyEnquiryForm, 
  submitGeneralContactForm 
} from '../utils/formSubmission'

// Property Seller Form (Existing Mailchimp Form)
const PropertySellerForm = ({ toggleModal }) => {
  const { modalData } = useModal()
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phonenumber: '',
    address: '',
    postcode: modalData ? modalData.postcode : '',
    valuation: '',
    message: '',
    showForm: true,
    gdprPhone: false,
    gdprPost: false,
    formSuccess: false,
  })

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setState(prevState => ({
      ...prevState,
      message: "Submitting your information..."
    }))
    
    try {
      const response = await addtoMailchimp(state.email, {
        FNAME: state.firstName,
        LNAME: state.lastName,
        PHONE: state.phonenumber,
        ADDRESS: state.address,
        POSTCODE: state.postcode,
        VALUATION: state.valuation,
        'gdpr[282]': state.gdprPhone ? 'Y' : '',
        'gdpr[283]': state.gdprPost ? 'Y' : '',
      })

      const newMessage =
        response.result === 'success'
          ? `${response.msg} Keep an eye on your inbox and spam folder. We'll get back to you shortly.`
          : `Error: ${response.msg}`

      setState((prevState) => ({
        ...prevState,
        message: newMessage,
        showForm: response.result === 'success' ? false : true,
        formSuccess: response.result === 'success',
      }))

      // Hide the error message after 6 seconds if the response is not successful
      if (response.result !== 'success') {
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            message: '',
          }))
        }, 6000)
      }
    } catch (error) {
      console.error("Mailchimp submission error:", error)
      setState((prevState) => ({
        ...prevState,
        message: error.message === "Timeout" 
          ? "Request timed out. Please try again later." 
          : `Error: ${error.message}`,
        formSuccess: false
      }))
      
      // Hide error message after 6 seconds
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          message: '',
        }))
      }, 6000)
    }
  }

  return (
    <>
      <h4 id="modal-title" className="font-semibold text-display-sm tracking-wide font-display text-center text-primary-600 mb-6">
        {state.formSuccess ? "Thanks for contacting us!" : "Complete The Form To Receive Your Offer"}
      </h4>
      
      {state.formSuccess && (
        <div className="mt-2">
          <p className="text-body-md text-primary-600 text-center p-3 rounded-lg">
            We aim to get back to you within 48 hours.
          </p>
        </div>
      )}

      {state.showForm && (
        <form
          id="contact_form"
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          className="mt-6 space-y-4"
        >
          <div className="mb-2">
            <label
              htmlFor="firstName"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              First Name:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={state.firstName}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="First Name"
              name="firstName"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="lastName"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Last Name:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={state.lastName}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Last Name"
              name="lastName"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phonenumber"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Phone Number:<span className="text-red-600"> *</span>
            </label>
            <input
              type="tel"
              value={state.phonenumber}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Phone Number"
              name="phonenumber"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Email:<span className="text-red-600"> *</span>
            </label>
            <input
              type="email"
              value={state.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              First Line of Address:
              <span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={state.address}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              id="address"
              name="address"
              placeholder="First Line of Address"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="postcode"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Postcode:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              id="postcode"
              name="postcode"
              placeholder="Postcode"
              defaultValue={
                modalData ? modalData.postcode : state.postcode
              }
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="valuation"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Estimated Property Valuation (£):
            </label>
            <input
              type="number"
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              id="valuation"
              name="valuation"
              placeholder="500,000"
              value={state.valuation}
            />
          </div>
          <div className="mb-4 mt-6 bg-neutral-50 p-4 rounded-lg">
            <div className="text-sm font-semibold mb-2 text-neutral-900">Marketing Permissions</div>
            <p className="text-body-xs mb-3 text-neutral-700">
              By using this form you are agreeing to hear from us by email. Please select all the 
              additional ways you would like to hear from Puretime Property Purchasing Ltd:
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="gdprPhone"
                  checked={state.gdprPhone}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-600 rounded"
                />
                <span className="text-sm text-neutral-800">Phone</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="gdprPost"
                  checked={state.gdprPost}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-600 rounded"
                />
                <span className="text-sm text-neutral-800">Post</span>
              </label>
            </div>
          </div>
          <div aria-hidden="true" className="hidden" hidden>
            <input
              type="text"
              name="b_d0281388fbca39d6d0711dcea_4cd2acada4"
              tabIndex="-1"
              defaultValue=""
            />
          </div>
          <div className="m-2 text-primary-600">
            <p>
              <span className="text-red-600">*</span> - Required
              Fields
            </p>
          </div>
          <div className="mt-4">
            <p className="text-body-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg">
              We use Mailchimp as our marketing platform. By
              clicking submit below, you acknowledge being added to
              our mailing list and your information will be
              transferred to Mailchimp for processing.{' '}
              <a
                href="https://mailchimp.com/legal/terms"
                className="text-primary-600 hover:underline"
              >
                Learn more
              </a>{' '}
              about Mailchimp's privacy practices. You can
              unsubscribe from our messages at any time by clicking
              the link in the footer of our emails.
            </p>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-full hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 font-semibold shadow-md"
              aria-label="Submit form"
            >
              Submit
            </button>
            
            {state.message && (
              <div 
                className={`mt-4 p-4 rounded-lg ${state.formSuccess ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
                role="status"
                aria-live="polite"
              >
                {state.message}
              </div>
            )}
          </div>
        </form>
      )}
    </>
  )
}

// Broker Referral Form
const BrokerReferralForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    message: '',
    formSubmitted: false,
    submissionMessage: '',
    honey_trap: '' // Add honeypot field to state
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check honeypot field
    if (formData.honey_trap) {
      console.log("Spam submission detected")
      return // Stop processing if honeypot is filled
    }
    
    try {
      // Update UI to show processing
      setFormData({
        ...formData,
        submissionMessage: "Processing your request..."
      })
      
      // Remove the honeypot field from the data we send
      const { honey_trap, ...formDataToSubmit } = formData
      
      // Submit to Netlify Forms
      const response = await submitBrokerReferralForm(formDataToSubmit)
      
      if (response.success) {
        setFormData({
          ...formData,
          formSubmitted: true,
          submissionMessage: "Thank you for your interest in our broker referral program. A member of our team will contact you shortly."
        })
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      setFormData({
        ...formData,
        submissionMessage: error.message || "There was an error submitting your form. Please try again."
      })
      
      // Hide error message after 6 seconds
      setTimeout(() => {
        setFormData((prevState) => ({
          ...prevState,
          submissionMessage: '',
        }))
      }, 6000)
    }
  }

  return (
    <>
      <h4 id="modal-title" className="font-semibold text-display-sm tracking-wide font-display text-center text-primary-600 mb-6">
        {formData.formSubmitted ? "Referral Request Received" : "Broker Referral Request"}
      </h4>
      
      {formData.formSubmitted ? (
        <div className="text-center p-4">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-4">
            {formData.submissionMessage}
          </div>
          <p className="text-neutral-700 mt-4">We aim to connect you with a specialist broker within 24 hours.</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="mt-6 space-y-4"
          name="broker-referral"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="honey_trap"
        >
          {/* Honeypot field - invisible to users but catches bots */}
          <div aria-hidden="true" className="hidden" style={{position: 'absolute', left: '-9999px'}}>
            <input
              type="text"
              name="honey_trap"
              tabIndex="-1"
              value={formData.honey_trap}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Full Name:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Full Name"
              name="name"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Email:<span className="text-red-600"> *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Phone Number:<span className="text-red-600"> *</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Phone Number"
              name="phone"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="loanAmount"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Approximate Loan Amount:
            </label>
            <input
              type="text"
              value={formData.loanAmount}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="e.g. £250,000"
              name="loanAmount"
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="message"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Additional Information:
            </label>
            <textarea
              value={formData.message}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="message"
              placeholder="Please provide any additional details about your financing needs"
              rows="4"
            />
          </div>
          
          <div className="m-2 text-primary-600">
            <p>
              <span className="text-red-600">*</span> - Required Fields
            </p>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-full hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 font-semibold shadow-md"
              aria-label="Submit form"
            >
              Request Broker Referral
            </button>
            
            {formData.submissionMessage && !formData.formSubmitted && (
              <div 
                className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-200"
                role="status"
                aria-live="polite"
              >
                {formData.submissionMessage}
              </div>
            )}
          </div>
        </form>
      )}
    </>
  )
}

// Property Enquiry Form
const PropertyEnquiryForm = () => {
  const { modalData } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: modalData && modalData.property ? modalData.property : '',
    message: '',
    formSubmitted: false,
    submissionMessage: '',
    honey_trap: '' // Add honeypot field to state
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check honeypot field
    if (formData.honey_trap) {
      console.log("Spam submission detected")
      return // Stop processing if honeypot is filled
    }
    
    try {
      // Update UI to show processing
      setFormData({
        ...formData,
        submissionMessage: "Processing your enquiry..."
      })
      
      // Remove the honeypot field from the data we send
      const { honey_trap, ...formDataToSubmit } = formData
      
      // Submit to Netlify Forms
      const response = await submitPropertyEnquiryForm(formDataToSubmit)
      
      if (response.success) {
        setFormData({
          ...formData,
          formSubmitted: true,
          submissionMessage: "Thank you for your property enquiry. We'll be in touch about this property shortly."
        })
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      setFormData({
        ...formData,
        submissionMessage: error.message || "There was an error submitting your enquiry. Please try again."
      })
      
      // Hide error message after 6 seconds
      setTimeout(() => {
        setFormData((prevState) => ({
          ...prevState,
          submissionMessage: '',
        }))
      }, 6000)
    }
  }

  return (
    <>
      <h4 id="modal-title" className="font-semibold text-display-sm tracking-wide font-display text-center text-primary-600 mb-6">
        {formData.formSubmitted ? "Enquiry Received" : "Property Enquiry"}
      </h4>
      
      {formData.formSubmitted ? (
        <div className="text-center p-4">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-4">
            {formData.submissionMessage}
          </div>
          <p className="text-neutral-700 mt-4">Our property specialists will contact you within 48 hours.</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="mt-6 space-y-4"
          name="property-enquiry"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="honey_trap"
        >
          {/* Honeypot field - invisible to users but catches bots */}
          <div aria-hidden="true" className="hidden" style={{position: 'absolute', left: '-9999px'}}>
            <input
              type="text"
              name="honey_trap"
              tabIndex="-1"
              value={formData.honey_trap}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Full Name:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Full Name"
              name="name"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Email:<span className="text-red-600"> *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Phone Number:<span className="text-red-600"> *</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Phone Number"
              name="phone"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="property"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Property:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={formData.property}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Property details"
              name="property"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="message"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Additional Comments:
            </label>
            <textarea
              value={formData.message}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="message"
              placeholder="Please tell us about your specific interests or questions about this property"
              rows="4"
            />
          </div>
          
          <div className="m-2 text-primary-600">
            <p>
              <span className="text-red-600">*</span> - Required Fields
            </p>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-full hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 font-semibold shadow-md"
              aria-label="Submit form"
            >
              Submit Enquiry
            </button>
            
            {formData.submissionMessage && !formData.formSubmitted && (
              <div 
                className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-200"
                role="status"
                aria-live="polite"
              >
                {formData.submissionMessage}
              </div>
            )}
          </div>
        </form>
      )}
    </>
  )
}

// General Contact Form
const GeneralContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    formSubmitted: false,
    submissionMessage: '',
    honey_trap: '' // Add honeypot field to state
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check honeypot field
    if (formData.honey_trap) {
      console.log("Spam submission detected")
      return // Stop processing if honeypot is filled
    }
    
    try {
      // Update UI to show processing
      setFormData({
        ...formData,
        submissionMessage: "Processing your message..."
      })
      
      // Remove the honeypot field from the data we send
      const { honey_trap, ...formDataToSubmit } = formData
      
      // Submit to Netlify Forms
      const response = await submitGeneralContactForm(formDataToSubmit)
      
      if (response.success) {
        setFormData({
          ...formData,
          formSubmitted: true,
          submissionMessage: "Thank you for your message. We'll get back to you as soon as possible."
        })
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      setFormData({
        ...formData,
        submissionMessage: error.message || "There was an error submitting your message. Please try again."
      })
      
      // Hide error message after 6 seconds
      setTimeout(() => {
        setFormData((prevState) => ({
          ...prevState,
          submissionMessage: '',
        }))
      }, 6000)
    }
  }

  return (
    <>
      <h4 id="modal-title" className="font-semibold text-display-sm tracking-wide font-display text-center text-primary-600 mb-6">
        {formData.formSubmitted ? "Message Received" : "Contact Us"}
      </h4>
      
      {formData.formSubmitted ? (
        <div className="text-center p-4">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-4">
            {formData.submissionMessage}
          </div>
          <p className="text-neutral-700 mt-4">We typically respond to queries within 1-2 business days.</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="mt-6 space-y-4"
          name="general-contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="honey_trap"
        >
          {/* Honeypot field - invisible to users but catches bots */}
          <div aria-hidden="true" className="hidden" style={{position: 'absolute', left: '-9999px'}}>
            <input
              type="text"
              name="honey_trap"
              tabIndex="-1"
              value={formData.honey_trap}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Full Name:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Full Name"
              name="name"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Email:<span className="text-red-600"> *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Phone Number:<span className="text-red-600"> *</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your Phone Number"
              name="phone"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="subject"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Subject:<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="What is your enquiry about?"
              name="subject"
              required
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="message"
              className="block font-medium text-neutral-900 mb-1.5 text-sm"
            >
              Message:<span className="text-red-600"> *</span>
            </label>
            <textarea
              value={formData.message}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40"
              name="message"
              placeholder="Please provide details of your enquiry"
              rows="4"
              required
            />
          </div>
          
          <div className="m-2 text-primary-600">
            <p>
              <span className="text-red-600">*</span> - Required Fields
            </p>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-full hover:bg-primary-700 focus:outline-none focus:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 font-semibold shadow-md"
              aria-label="Submit form"
            >
              Send Message
            </button>
            
            {formData.submissionMessage && !formData.formSubmitted && (
              <div 
                className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-200"
                role="status"
                aria-live="polite"
              >
                {formData.submissionMessage}
              </div>
            )}
          </div>
        </form>
      )}
    </>
  )
}

const Modal = () => {
  const { isModalOpen, toggleModal, formType } = useModal()
  
  // References for focus management
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastFocusedElement = useRef(null)
  
  // Handle focus when modal opens and closes
  useEffect(() => {
    if (isModalOpen) {
      // Store the currently focused element to restore later
      lastFocusedElement.current = document.activeElement
      
      // Focus the close button when modal opens
      if (closeButtonRef.current) {
        closeButtonRef.current.focus()
      }
      
      // Trap focus inside modal
      const handleTabKey = (e) => {
        if (!modalRef.current) return
        
        // Get all focusable elements
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        
        // If shift+tab pressed and focus on first element, move to last focusable element
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        } 
        // If tab pressed and focus on last element, move to first focusable element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
      
      const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
          handleTabKey(e)
        } else if (e.key === 'Escape') {
          toggleModal({})
        }
      }
      
      // Add event listener
      document.addEventListener('keydown', handleKeyDown)
      
      // Remove event listener on cleanup
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else if (lastFocusedElement.current) {
      // Restore focus when modal closes
      lastFocusedElement.current.focus()
    }
  }, [isModalOpen, toggleModal])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Just prevent scrolling without changing position
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      
      return () => {
        // Re-enable scrolling
        document.body.style.overflow = '';
        document.body.style.width = '';
      };
    }
  }, [isModalOpen]);

  const handleCloseModal = (e) => {
    // Close modal when clicking on the backdrop
    if (e.target.id === 'modal_backdrop') {
      toggleModal({});
    }
  }

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  }
  
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500,
        duration: 0.3,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: { 
        duration: 0.2
      }
    }
  }

  // Determine which form to display based on formType
  const renderForm = () => {
    switch(formType) {
      case FORM_TYPES.BROKER_REFERRAL:
        return <BrokerReferralForm />;
      case FORM_TYPES.PROPERTY_ENQUIRY:
        return <PropertyEnquiryForm />;
      case FORM_TYPES.GENERAL_CONTACT:
        return <GeneralContactForm />;
      case FORM_TYPES.PROPERTY_SELLER:
      default:
        return <PropertySellerForm toggleModal={toggleModal} />;
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Modal backdrop */}
          <motion.div
            id="modal_backdrop"
            onClick={handleCloseModal}
            className="fixed z-[10000] inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            aria-hidden="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          />
          
          {/* Modal dialog */}
          <section
            id="contact_modal"
            className="fixed z-[10001] inset-0 flex items-center justify-center p-4 pointer-events-none overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div 
              ref={modalRef}
              className="w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-white rounded-xl shadow-xl shadow-primary-600/20 sm:w-[28rem] md:w-[32rem] lg:w-[36rem] xl:w-[42rem] 2xl:w-[48rem] pointer-events-auto border border-neutral-100"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="relative">
                <button
                  ref={closeButtonRef}
                  onClick={() => toggleModal({})}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                      toggleModal({});
                    }
                  }}
                  className="absolute top-0 right-0 p-2 text-display-md text-primary-600 cursor-pointer hover:bg-neutral-50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600"
                  aria-label="Close modal"
                  type="button"
                >
                  &times;
                </button>
              </div>
              <div className="pt-6 pb-4">
                <div className="flex flex-col justify-center">
                  {renderForm()}
                </div>
              </div>
            </motion.div>
          </section>
        </>
      )}
    </AnimatePresence>
  )
}
export default Modal
