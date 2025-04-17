import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useModal } from '../context/modalContext'

const Input = () => {
  const { openModal, setModalData } = useModal()
  const [postcode, setPostcode] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleInputChange = (e) => {
    setPostcode(e.target.value)
  }

  const handleButtonClick = () => {
    // Set postcode data to be passed to modal
    setModalData({ postcode })
    openModal()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <motion.div 
      id="banner_input" 
      className="bg-neutral-900 relative py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 py-4 md:py-6">
          <motion.div 
            className="col-span-1 items-center lg:col-start-2 lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="rounded-full overflow-hidden relative shadow-lg">
              <motion.div 
                id="div_input" 
                className={`w-full relative ${isFocused ? 'ring-2 ring-primary-400 ring-opacity-50' : ''}`}
              >
                <input
                  name="postcode_input"
                  type="text"
                  className="w-full bg-neutral-800 text-body-lg hidden md:inline-block font-light px-6 py-5 focus:outline-none text-dark-100"
                  placeholder="Enter Your Postcode For A Free Valuation"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <input
                  name="postcode_input"
                  type="text"
                  className="w-full bg-neutral-800 inline-block md:hidden text-body-md font-light px-6 py-5 focus:outline-none text-dark-100"
                  placeholder="Enter Your Postcode"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <motion.button
                  type="submit"
                  className="absolute top-0 right-0 h-full rounded-r-full bg-primary-600 text-body-md md:text-body-lg font-medium px-6 py-4 text-white"
                  onClick={handleButtonClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Get Offer
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
export default Input
