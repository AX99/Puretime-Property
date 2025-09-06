import React from 'react'
import { graphql, Link } from 'gatsby'
import { motion } from 'framer-motion'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowLeft, FaHome, FaRegBuilding, FaRegMoneyBillAlt, FaMapMarked } from 'react-icons/fa'
import Seo from '../components/seo'
import PropertyImageCarousel from '../components/PropertyImageCarousel'
import PropertyMap from '../components/PropertyMap'
import ContactButton from '../components/ContactButton'
import SanityBlockRenderer from '../components/SanityBlockRenderer'
import { FORM_TYPES } from '../context/modalContext'

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

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const PropertyDetailTemplate = ({ data }) => {
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
    customPropertyType,
    tenure,
    slug
  } = property

  // Safely access location fields with fallbacks
  const {
    city = '',
    state = '',
    street = '',
    postalCode = '',
    country = '',
    coordinates = {}
  } = location || {}

  // Safely access coordinates
  const lat = coordinates?.lat
  const lng = coordinates?.lng

  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : 'Date not available'

  const locationString = city ?
    `${city}${state ? `, ${state}` : ''}` :
    'Location not specified'

  const fullAddress = location ?
    `${street || ''} ${city || ''} ${state || ''} ${postalCode || ''} ${country || ''}`.trim() :
    'Address not available'

  // Status badge styling and text
  const getStatusDetails = () => {
    switch (status) {
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
          color: 'bg-primary-600',
          text: 'For Sale'
        };
    }
  }

  const statusDetails = getStatusDetails()

  return (
    <>
      <Seo
        title={`${title} | Property Details`}
        description={description ? description[0]?.children?.map(child => child.text).join(' ').substring(0, 160) : `View details for ${title} located in ${locationString}`}
      />

      <section className="bg-neutral-50 pt-8 pb-16 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb and Back Button */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <Link
              to="/properties"
              className="inline-flex items-center text-neutral-700 hover:text-primary-600"
            >
              <FaArrowLeft className="mr-2" />
              Back to all properties
            </Link>
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

                  {/* <div className="flex flex-wrap items-center mb-6">
                    <div className="text-3xl font-bold text-primary-600 mr-4">
                      {formattedPrice}
                    </div>
                    {priceUnit && (
                      <div className="text-sm text-neutral-500 mt-1">
                        {priceUnit.toUpperCase()}
                      </div>
                    )}
                  </div> */}

                  {/* Key Property Features - Horizontal Layout */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                      <FaBed className="text-primary-600 mr-2" />
                      <span><span className="text-neutral-500 mr-1">Bedrooms:</span> {bedrooms || 'N/A'}</span>
                    </div>
                    <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                      <FaBath className="text-primary-600 mr-2" />
                      <span><span className="text-neutral-500 mr-1">Bathrooms:</span> {bathrooms || 'N/A'}</span>
                    </div>
                    <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                      <FaRuler className="text-primary-600 mr-2" />
                      <span><span className="text-neutral-500 mr-1">Area:</span> {area ? `${area} ${areaUnit}` : 'N/A'}</span>
                    </div>
                    <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                      <FaHome className="text-primary-600 mr-2" />
                      <span>
                        <span className="text-neutral-500 mr-1">Type:</span> 
                        {propertyType === 'other' 
                          ? (customPropertyType || 'Other')
                          : (propertyType ? propertyType.charAt(0).toUpperCase() + propertyType.slice(1) : 'N/A')
                        }
                      </span>
                    </div>
                  </div>

                  {/* Quick Property Details - Horizontal Layout (visible only on mobile) */}
                  <div className="flex flex-wrap gap-3 mb-8 md:hidden">
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

                    {publishedAt && (
                      <div className="inline-flex items-center bg-neutral-50 px-4 py-2 rounded-md">
                        <FaCalendarAlt className="text-primary-600 mr-2" />
                        <span><span className="text-neutral-500 mr-1">Listed:</span> {formattedDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <SanityBlockRenderer blocks={description} />
                  </div>

                  {amenities && amenities.length > 0 && (
                    <div className="mb-8 md:hidden">
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

                  {/* Location Section with Map - Small screen only */}
                  {location && (
                    <div className="mb-8 md:hidden">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FaMapMarked className="mr-2 text-primary-600" />
                        Location
                      </h2>

                      <div className="mb-4">
                        <address className="not-italic bg-neutral-50 p-4 rounded-md text-neutral-700">
                          {street && <div>{street}</div>}
                          {city && <div>{city}</div>}
                          {state && <div>{state}</div>}
                          {postalCode && <div>{postalCode}</div>}
                          {country && <div>{country}</div>}
                        </address>
                      </div>

                      {/* Property Map Component */}
                      {(lat && lng) ? (
                        <PropertyMap
                          latitude={lat}
                          longitude={lng}
                          title={title}
                          address={fullAddress}
                          mapHeight="300px"
                          zoom={15}
                          propertyData={{
                            bedrooms,
                            bathrooms,
                            price,
                            priceUnit,
                            propertyType
                          }}
                          className="z-20"
                        />
                      ) : (
                        <div className="bg-neutral-100 h-[300px] rounded-md flex items-center justify-center">
                          <p className="text-neutral-500">Map location not available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - 1/3 width on desktop */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideIn}
              className="lg:col-span-1"
            >
              {/* Enquiry Form Card */}
              {status !== "sold" && <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
                  <p className="text-neutral-600 mb-6">
                    Contact us for more information or to schedule a viewing.
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ContactButton
                      formType={FORM_TYPES.PROPERTY_ENQUIRY}
                      buttonText="Enquire"
                      buttonClass="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-md transition-colors"
                      data={{
                        property: `${title} (${slug?.current || property._id})`
                      }}
                    />
                  </motion.div>
                </div>
              </div>}

              {/* Property Details Card - hidden on small screens */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 hidden md:block">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Details</h2>

                  <div className="space-y-3">
                    {propertyType && (
                      <div className="flex items-start bg-neutral-50 p-3 rounded-md">
                        <FaHome className="text-primary-600 mr-3 mt-1 w-5" />
                        <div>
                          <h3 className="font-medium">Property Type</h3>
                          <p className="capitalize text-neutral-700">
                            {propertyType === 'other' 
                              ? (customPropertyType || 'Other')
                              : propertyType
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {tenure && (
                      <div className="flex items-start bg-neutral-50 p-3 rounded-md">
                        <FaRegBuilding className="text-primary-600 mr-3 mt-1 w-5" />
                        <div>
                          <h3 className="font-medium">Tenure</h3>
                          <p className="text-neutral-700">{tenure}</p>
                        </div>
                      </div>
                    )}

                    {councilTaxBand && (
                      <div className="flex items-start bg-neutral-50 p-3 rounded-md">
                        <FaRegMoneyBillAlt className="text-primary-600 mr-3 mt-1 w-5" />
                        <div>
                          <h3 className="font-medium">Council Tax Band</h3>
                          <p className="text-neutral-700">Band {councilTaxBand}</p>
                        </div>
                      </div>
                    )}

                    {status && (
                      <div className="flex items-start bg-neutral-50 p-3 rounded-md">
                        <FaTag className="text-primary-600 mr-3 mt-1 w-5" />
                        <div>
                          <h3 className="font-medium">Status</h3>
                          <p className="text-neutral-700">{statusDetails.text}</p>
                        </div>
                      </div>
                    )}

                    {publishedAt && (
                      <div className="flex items-start bg-neutral-50 p-3 rounded-md">
                        <FaCalendarAlt className="text-primary-600 mr-3 mt-1 w-5" />
                        <div>
                          <h3 className="font-medium">Date Listed</h3>
                          <p className="text-neutral-700">{formattedDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Features Card - hidden on small screens */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 hidden md:block">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Features</h2>

                  <ul className="space-y-3">
                    {amenities && amenities.length > 0 ? (
                      <>
                        {amenities.map((amenity, index) => (
                          <li key={index} className="flex items-start bg-neutral-50 p-3 rounded-md">
                            <span className="text-primary-600 mr-2">•</span>
                            <span className="text-neutral-700">{amenity}</span>
                          </li>
                        ))}
                      </>
                    ) : (
                      <li className="text-neutral-500 bg-neutral-50 p-3 rounded-md">No features listed</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Location Card with Map - Desktop only */}
              {location && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 hidden md:block">
                  <div className="p-6 w-full">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FaMapMarked className="mr-2 text-primary-600" />
                      Location
                    </h2>
                    <address className="not-italic mb-4 text-neutral-700 bg-neutral-50 p-4 rounded-md">
                      {street && <div>{street}</div>}
                      {city && <div>{city}</div>}
                      {state && <div>{state}</div>}
                      {postalCode && <div>{postalCode}</div>}
                      {country && <div>{country}</div>}
                    </address>

                    {/* Property Map Component */}
                    {(lat && lng) ? (
                      <div className="w-full">
                        <PropertyMap
                          latitude={lat}
                          longitude={lng}
                          title={title}
                          address={fullAddress}
                          mapHeight="250px"
                          zoom={14}
                          propertyData={{
                            bedrooms,
                            bathrooms,
                            price,
                            priceUnit,
                            propertyType
                          }}
                          className='z-20'
                        />
                      </div>
                    ) : (
                      <div className="bg-neutral-100 h-[250px] rounded-md flex items-center justify-center">
                        <p className="text-neutral-500">Map location not available</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
              Need financing for your next property <span className="italic">investment</span>?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/90 mb-8">
              We can introduce you to specialist brokers for all types of property finance, from bridging loans to buy-to-let mortgages.
            </motion.p>
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactButton
                formType={FORM_TYPES.BROKER_REFERRAL}
                buttonText="Speak to a Finance Specialist"
                buttonClass="secondary-btn"
              />
            </motion.div>
          </motion.div>
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
      customPropertyType
      bedrooms
      bathrooms
      area
      areaUnit
      description {
        _key
        _type
        style
        listItem
        level
        children {
          _key
          _type
          text
          marks
        }
      }
      location {
        city
        state
        street
        postalCode
        country
        coordinates {
          lat
          lng
        }
      }
      mainImage {
        asset {
          gatsbyImageData(
            width: 1200
            height: 800
            placeholder: BLURRED
            formats: [AVIF, WEBP]
            layout: CONSTRAINED
          )
        }
      }
      images {
        asset {
          gatsbyImageData(
            width: 1200
            height: 800
            placeholder: BLURRED
            formats: [AVIF, WEBP]
            layout: CONSTRAINED
          )
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