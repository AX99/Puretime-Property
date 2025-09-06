import React from 'react'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaEye, FaArrowRight } from 'react-icons/fa'
import { usePropertyPreview } from '../context/propertyPreviewContext'
import ContactButton from '../components/ContactButton'
import { FORM_TYPES } from '../context/modalContext'


// Property Card component for displaying property listings
const PropertyCard = ({ property }) => {
  const { openPreview } = usePropertyPreview()
  const { title, location, bedrooms, bathrooms, area, description, amenities, mainImage, status, slug, price } = property
  const imageData = mainImage?.asset?.gatsbyImageData

  // Format location string from location object
  const locationString = location?.city ?
    `${location.city}${location.state ? `, ${location.state}` : ''}` :
    'Location not specified'

  // Status badge styling
  const getStatusBadge = () => {
    switch (status) {
      case 'sold':
        return (
          <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-2 rounded-br-lg font-semibold">
            Sold
          </div>
        );
      case 'for-rent':
        return (
          <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-br-lg font-semibold">
            For Rent
          </div>
        );
      case 'rented':
        return (
          <div className="absolute top-0 left-0 bg-purple-600 text-white px-4 py-2 rounded-br-lg font-semibold">
            Rented
          </div>
        );
      default:
        return null;
    }
  };

  // Check if property is sold or rented
  const isUnavailable = status === 'sold' || status === 'rented';

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-52 bg-neutral-200">
        {/* Image with overlay link to full details */}
        <Link to={`/properties/${slug?.current || property._id}`} className="block h-full group">
          {imageData ? (
            <>
              <GatsbyImage
                image={imageData}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-colors duration-300">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-0 transition-opacity duration-300">
                  <div className="bg-primary-600 text-white py-2 px-4 rounded-full shadow-lg flex items-center">
                    <FaArrowRight className="mr-2" />
                    <span>Click here to view</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </Link>
        {typeof price === 'number' && (
          <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-2 rounded-bl-lg font-semibold">
            £{price.toLocaleString()}
          </div>
        )}
        {getStatusBadge()}
      </div>

      <div className="p-6 flex-grow">
        <Link to={`/properties/${slug?.current || property._id}`} className="block hover:text-primary-600 transition-colors">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        </Link>
        <div className="flex items-center text-neutral-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-primary-600" />
          <span>{locationString}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <FaBed className="mr-2 text-primary-600" />
            <span>{bedrooms || 'N/A'} Beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-2 text-primary-600" />
            <span>{bathrooms || 'N/A'} Baths</span>
          </div>
          <div className="flex items-center">
            <FaRuler className="mr-2 text-primary-600" />
            <span>{area ? `${area} ${property.areaUnit || 'sqft'}` : 'N/A'}</span>
          </div>
        </div>

        {description && (
          <div className="text-neutral-600 mb-4 line-clamp-3">
            {description[0]?.children?.map(child => child.text).join(' ') || 'No description available'}
          </div>
        )}

        {amenities && amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full text-xs">
                {amenity}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 pt-0">
        {isUnavailable ? (
          <motion.button
            onClick={() => openPreview(property)}
            className="w-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold py-3 px-4 rounded-md transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaEye className="mr-2" />
            Quick View
          </motion.button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <motion.button
              onClick={() => openPreview(property)}
              className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold py-3 px-4 rounded-md transition-colors flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaEye className="mr-2" />
              Quick View
            </motion.button>

            <motion.div
              className="flex-1 text-center rounded-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ContactButton
                formType={FORM_TYPES.PROPERTY_ENQUIRY}
                buttonText="Enquire"
                buttonClass="bg-primary-600 w-full hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                data={{
                  property: `${title} (${slug?.current || property._id})`
                }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard 