import React from 'react'
import { graphql, Link } from 'gatsby'
import { motion } from 'framer-motion'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowLeft, FaHome, FaPoundSign, FaRegBuilding, FaRegMoneyBillAlt } from 'react-icons/fa'
import Seo from '../components/seo'
import { useModal } from '../context/modalContext'
import PropertyImageCarousel from '../components/PropertyImageCarousel'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, delay: 0.3 }
  }
}

const PropertyDetailTemplate = ({ data }) => {
  const { openModal, setModalData } = useModal()
  const property = data.sanityProperty
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1>Property not found</h1>
        <Link to="/properties">Back to properties</Link>
      </div>
    )
  }
  
  const { 
    _id, 
    title, 
    price, 
    priceUnit = 'gbp', 
    bedrooms, 
    bathrooms, 
    area, 
    areaUnit = 'sqft', 
    description, 
    location, 
    mainImage, 
    images, 
    amenities, 
    status,
    propertyType,
    publishedAt,
    councilTaxBand,
    tenure
  } = property
  
  // Format price with currency symbol
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: priceUnit?.toUpperCase() || 'GBP',
    maximumFractionDigits: 0
  }).format(price || 0)
  
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : 'Date not available'
  
  const locationString = location?.city ? 
    `${location.city}${location.state ? `, ${location.state}` : ''}` : 
    'Location not specified'
    
  const fullAddress = location ? 
    `${location.street || ''} ${location.city || ''} ${location.state || ''} ${location.postalCode || ''} ${location.country || ''}`.trim() : 
    'Address not available'
  
  // Status badge styling and text
  const getStatusDetails = () => {
    switch(status) {
      case 'sold':
        return { 
          color: 'bg-red-600', 
          text: 'Sold' 
        };
      case 'for-rent':
        return { 
          color: 'bg-blue-600', 
          text: 'For Rent' 
        };
      case 'rented':
        return { 
          color: 'bg-purple-600', 
          text: 'Rented' 
        };
      case 'for-sale':
      default:
        return { 
          color: 'bg-green-600', 
          text: 'For Sale' 
        };
    }
  }
  
  const statusDetails = getStatusDetails()
  
  const handleEnquire = () => {
    setModalData({ 
      title: 'Property Enquiry',
      subtitle: `About: ${title}`,
      content: `
        <p class="mb-4">Please fill out the form below and we'll get back to you with more information about this property.</p>
        <p class="mb-4"><strong>Property:</strong> ${title}</p>
        <p class="mb-4"><strong>Location:</strong> ${location?.city || 'N/A'}</p>
        <p class="mb-4"><strong>Price:</strong> ${formattedPrice}</p>
      `,
      formType: 'property',
      formData: {
        propertyId: property._id,
        propertyTitle: title,
      }
    });
    openModal('contact');
  };
  
  return (
    <>
      <Seo 
        title={`${title} | Property Details`}
        description={description ? description[0]?.children?.map(child => child.text).join(' ').substring(0, 160) : `View details for ${title} located in ${locationString}`}
      />
      
      <section className="bg-neutral-50 pt-8 pb-16 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="inline-flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-neutral-400">/</span>
                    <Link to="/properties" className="text-sm font-medium text-neutral-700 hover:text-primary-600">
                      Properties
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-neutral-400">/</span>
                    <span className="text-sm font-medium text-neutral-500 truncate max-w-[200px]">
                      {title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
              >
                {/* Property Image Carousel */}
                <div className="relative">
                  <PropertyImageCarousel 
                    mainImage={mainImage}
                    images={images}
                    showThumbnails={true}
                    aspectRatio="aspect-[16/9]"
                  />
                  
                  <div className={`absolute top-4 right-4 ${statusDetails.color} text-white px-4 py-2 rounded-lg font-semibold`}>
                    {statusDetails.text}
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                  <div className="flex items-center text-neutral-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-primary-600" />
                    <span>{locationString}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center mb-6">
                    <div className="text-3xl font-bold text-primary-600 mr-4">
                      {formattedPrice}
                    </div>
                    {priceUnit && (
                      <div className="text-sm text-neutral-500 mt-1">
                        {priceUnit.toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg">
                      <FaBed className="text-xl text-primary-600 mb-2" />
                      <span className="text-sm text-neutral-500">Bedrooms</span>
                      <span className="font-semibold">{bedrooms || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg">
                      <FaBath className="text-xl text-primary-600 mb-2" />
                      <span className="text-sm text-neutral-500">Bathrooms</span>
                      <span className="font-semibold">{bathrooms || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg">
                      <FaRuler className="text-xl text-primary-600 mb-2" />
                      <span className="text-sm text-neutral-500">Area</span>
                      <span className="font-semibold">{area ? `${area} ${areaUnit}` : 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-lg">
                      <FaHome className="text-xl text-primary-600 mb-2" />
                      <span className="text-sm text-neutral-500">Type</span>
                      <span className="font-semibold capitalize">{propertyType || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    {description && description.length > 0 ? (
                      <div className="text-neutral-700 space-y-4">
                        {description.map((block, i) => (
                          <p key={i}>
                            {block.children?.map(child => child.text).join(' ')}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-neutral-500">No description available</p>
                    )}
                  </div>
                  
                  {amenities && amenities.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center bg-neutral-50 p-3 rounded-md">
                            <span className="text-primary-600 mr-2">•</span>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* UK Specific Property Details */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tenure */}
                      {tenure && (
                        <div className="flex items-start p-3 bg-neutral-50 rounded-md">
                          <FaRegBuilding className="text-primary-600 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium">Tenure</h3>
                            <p>{tenure}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Council Tax Band */}
                      {councilTaxBand && (
                        <div className="flex items-start p-3 bg-neutral-50 rounded-md">
                          <FaRegMoneyBillAlt className="text-primary-600 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium">Council Tax Band</h3>
                            <p>Band {councilTaxBand}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Status */}
                      <div className="flex items-start p-3 bg-neutral-50 rounded-md">
                        <FaTag className="text-primary-600 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Status</h3>
                          <p>{statusDetails.text}</p>
                        </div>
                      </div>
                      
                      {/* Date Listed */}
                      {publishedAt && (
                        <div className="flex items-start p-3 bg-neutral-50 rounded-md">
                          <FaCalendarAlt className="text-primary-600 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium">Date Listed</h3>
                            <p>{formattedDate}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Address */}
                  {location && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Location</h2>
                      <address className="not-italic">
                        {location.street && <div>{location.street}</div>}
                        {location.city && <div>{location.city}</div>}
                        {location.state && <div>{location.state}</div>}
                        {location.postalCode && <div>{location.postalCode}</div>}
                        {location.country && <div>{location.country}</div>}
                      </address>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <Link 
                to="/properties" 
                className="inline-flex items-center text-neutral-700 hover:text-primary-600 mb-8"
              >
                <FaArrowLeft className="mr-2" />
                Back to all properties
              </Link>
            </div>
            
            {/* Sidebar - 1/3 width on desktop */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideIn}
              className="lg:col-span-1"
            >
              {/* Enquiry Form Card */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
                  <p className="text-neutral-600 mb-6">
                    Contact us for more information or to schedule a viewing.
                  </p>
                  
                  <motion.button
                    onClick={handleEnquire}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-md transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Information
                  </motion.button>
                </div>
              </div>
              
              {/* Property Highlights Card */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Highlights</h2>
                  
                  <div className="space-y-4">
                    {/* Property Type */}
                    {propertyType && (
                      <div className="flex items-start">
                        <FaHome className="text-primary-600 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Property Type</h3>
                          <p className="capitalize">{propertyType}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-start">
                      <FaPoundSign className="text-primary-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-medium">Price</h3>
                        <p>{formattedPrice}</p>
                      </div>
                    </div>
                    
                    {/* Tenure */}
                    {tenure && (
                      <div className="flex items-start">
                        <FaRegBuilding className="text-primary-600 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Tenure</h3>
                          <p>{tenure}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Date Listed */}
                    {publishedAt && (
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-primary-600 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">Date Listed</h3>
                          <p>{formattedDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PropertyDetailTemplate

export const query = graphql`
  query PropertyDetailQuery($id: String!) {
    sanityProperty(id: { eq: $id }) {
      _id
      title
      slug {
        current
      }
      price
      priceUnit
      propertyType
      bedrooms
      bathrooms
      area
      areaUnit
      description {
        _type
        children {
          text
        }
      }
      location {
        city
        state
        street
        postalCode
        country
      }
      mainImage {
        asset {
          gatsbyImageData(width: 1200, height: 800, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      images {
        asset {
          gatsbyImageData(width: 1200, height: 800, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      amenities
      featured
      status
      publishedAt
      councilTaxBand
      tenure
    }
  }
` 