import React, { useState } from 'react'

import { useModal } from '../context/modalContext'

const Input = () => {
  const { openModal, setModalData } = useModal()
  const [postcode, setPostcode] = useState('')

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
    <div id="banner_input" className="bg-neutral-900 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 py-4 md:py-6">
          <div className="col-span-1 items-center lg:col-start-2 lg:col-span-2">
            <div className="rounded-full overflow-hidden relative">
              <div id="div_input" className="w-full relative">
                <input
                  name="postcode_input"
                  type="text"
                  className="w-full bg-neutral-800 text-body-lg hidden md:inline-block font-light px-6 py-4 focus:outline-none text-white"
                  placeholder="Enter Your Postcode For A Free Valuation"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <input
                  name="postcode_input"
                  type="text"
                  className="w-full bg-neutral-800 inline-block md:hidden text-body-md font-light px-6 py-4 focus:outline-none text-white"
                  placeholder="Enter Your Postcode"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 h-full rounded-r-full bg-primary-600 text-body-md md:text-body-lg font-light px-6 py-4 text-white"
                  onClick={handleButtonClick}
                >
                  Get Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Input
