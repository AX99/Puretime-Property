import React, { useEffect, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaTimes, FaArrowRight, FaHouseUser, FaTag, FaRegBuilding, FaRegMoneyBillAlt } from 'react-icons/fa'
import { usePropertyPreview } from '../context/propertyPreviewContext'
import PropertyImageCarousel from './PropertyImageCarousel'

const PropertyPreview = () => {
  const { isPreviewOpen, previewProperty, closePreview } = usePropertyPreview()
  
  // References for focus management and accessibility
  const previewRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastFocusedElement = useRef(null)
  
  // Close on navigation
  useEffect(() => {
    // Function to handle any navigation
    const handleNavigate = () => {
      if (isPreviewOpen) {
        closePreview();
      }
    };
    
    // Handle browser back/forward
    window.addEventListener('popstate', handleNavigate);
    
    return () => {
      window.removeEventListener('popstate', handleNavigate);
    };
  }, [isPreviewOpen, closePreview]);
  
  // Handle focus management
  useEffect(() => {
    if (isPreviewOpen) {
      // Store the currently focused element to restore later
      lastFocusedElement.current = document.activeElement
      
      // Focus the close button when preview opens
      if (closeButtonRef.current) {
        closeButtonRef.current.focus()
      }
      
      // Trap focus inside preview
      const handleTabKey = (e) => {
        if (!previewRef.current) return
        
        // Get all focusable elements
        const focusableElements = previewRef.current.querySelectorAll(
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
          closePreview()
        }
      }
      
      // Add event listener
      document.addEventListener('keydown', handleKeyDown)
      
      // Prevent body scrolling when preview is open
      document.body.style.overflow = 'hidden'
      
      // Remove event listener on cleanup
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    } else if (lastFocusedElement.current) {
      // Restore focus when preview closes
      lastFocusedElement.current.focus()
    }
  }, [isPreviewOpen, closePreview])
  
  // Prepare property data if available
  if (!previewProperty) return null
  
  const { 
    _id, 
    title, 
    slug, 
    location, 
    price, 
    priceUnit = 'gbp', 
    bedrooms, 
    bathrooms, 
    area, 
    areaUnit, 
    description, 
    amenities, 
    mainImage, 
    images, 
    status,
    propertyType,
    publishedAt,
    councilTaxBand,
    tenure
  } = previewProperty
  
  // Format price with currency symbol
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: priceUnit?.toUpperCase() || 'GBP',
    maximumFractionDigits: 0
  }).format(price || 0)
  
  // Format date
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : null
  
  // Format location string from location object
  const locationString = location?.city ? 
    `${location.city}${location.state ? `, ${location.state}` : ''}` : 
    'Location not specified'
  
  // Status text and color based on property status
  const getStatusDetails = () => {
    switch(status) {
      case 'sold':
        return { color: 'bg-red-600', text: 'Sold' };
      case 'for-rent':
        return { color: 'bg-blue-600', text: 'For Rent' };
      case 'rented':
        return { color: 'bg-purple-600', text: 'Rented' };
      case 'for-sale':
      default:
        return { color: 'bg-primary-600', text: 'For Sale' };
    }
  }
  
  const statusDetails = getStatusDetails()
  
  // Get first paragraph of description
  const firstParagraph = description && description.length > 0 
    ? description[0]?.children?.map(child => child.text).join(' ') 
    : 'No description available'

  // Property details URL
  const propertyUrl = `/property/${slug?.current || _id}`;
  
  return (
    <AnimatePresence>
      {isPreviewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9000]"
            onClick={closePreview}
          />
          
          {/* Preview Panel */}
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-2/5 bg-white shadow-xl overflow-y-auto z-[9001]"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md text-neutral-700 hover:text-primary-600 transition-colors"
              aria-label="Close preview"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            
            {/* Property content */}
            <div className="flex flex-col h-full">
              {/* Property Image Carousel - Removed aspect ratio */}
              <div className="relative">
                <PropertyImageCarousel 
                  mainImage={mainImage}
                  images={images}
                  showThumbnails={true}
                  className="w-full"
                />
                
                <div className={`absolute top-4 left-4 ${statusDetails.color} text-white px-4 py-2 rounded-lg font-semibold`}>
                  {statusDetails.text}
                </div>
              </div>
              
              {/* View Full Details Button - At top level */}
              <div className="bg-neutral-50 py-3 px-6 border-b border-neutral-100">
                <a 
                  href={propertyUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    closePreview();
                    navigate(propertyUrl);
                  }}
                  className="flex items-center justify-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View Full Property Details
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
              
              {/* Content with no top padding */}
              <div className="p-6 md:p-8 pt-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
                <div className="flex items-center text-neutral-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-primary-600" />
                  <span>{locationString}</span>
                </div>
                
                <div className="text-3xl font-bold text-primary-600 mb-6">
                  {formattedPrice}
                </div>
                
                {/* Property key details */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center p-4 bg-neutral-100 rounded-lg">
                    <FaBed className="text-xl text-primary-600 mb-2" />
                    <span className="text-sm text-neutral-500">Bedrooms</span>
                    <span className="font-semibold">{bedrooms || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-neutral-100 rounded-lg">
                    <FaBath className="text-xl text-primary-600 mb-2" />
                    <span className="text-sm text-neutral-500">Bathrooms</span>
                    <span className="font-semibold">{bathrooms || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-neutral-100 rounded-lg">
                    <FaRuler className="text-xl text-primary-600 mb-2" />
                    <span className="text-sm text-neutral-500">Area</span>
                    <span className="font-semibold">
                      {area ? `${area} ${areaUnit || 'sqft'}` : 'N/A'}
                    </span>
                  </div>
                </div>
                
                {/* Property type and tenure */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {propertyType && (
                    <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                      <FaHouseUser className="text-primary-600 mr-2" />
                      <span><span className="text-neutral-500 mr-1">Property Type:</span> {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}</span>
                    </div>
                  )}
                  
                  {tenure && (
                      <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                        <FaRegBuilding className="text-primary-600 mr-2" />
                        <span><span className="text-neutral-500 mr-1">Tenure:</span> {tenure}</span>
                      </div>
                    )}
                    
                    {councilTaxBand && (
                      <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                        <FaRegMoneyBillAlt className="text-primary-600 mr-2" />
                        <span><span className="text-neutral-500 mr-1">Council Tax:</span> Band {councilTaxBand}</span>
                      </div>
                    )}
                    
                    <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                      <FaTag className="text-primary-600 mr-2" />
                      <span><span className="text-neutral-500 mr-1">Status:</span> {statusDetails.text}</span>
                    </div>
                </div>
                
                {/* Description preview with Read More link */}
                {description && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                    <div className="text-neutral-700">
                      <p className="line-clamp-4 mb-2">{firstParagraph}</p>
                      <a 
                        href={propertyUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          closePreview();
                          navigate(propertyUrl);
                        }}
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                      >
                        Read more
                        <FaArrowRight className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Amenities preview */}
                {amenities && amenities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                      {amenities.length > 3 && (
                        <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                          +{amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Full detail link (bottom) */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a 
                    href={propertyUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      closePreview();
                      navigate(propertyUrl);
                    }}
                    className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors w-full"
                  >
                    View Full Details
                    <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PropertyPreview 