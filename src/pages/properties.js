import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa'

import Seo from '../components/seo'
import { useModal } from '../context/modalContext'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

const PropertyCard = ({ property, onInquire }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-52 bg-neutral-200">
        {property.image && (
          <div className="h-full w-full bg-cover bg-center" 
               style={{ backgroundImage: `url('/images/properties/${property.image}')` }} />
        )}
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-2 rounded-bl-lg font-semibold">
          {property.price}
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <div className="flex items-center text-neutral-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-primary-600" />
          <span>{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <FaBed className="mr-2 text-primary-600" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-2 text-primary-600" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <FaRuler className="mr-2 text-primary-600" />
            <span>{property.area}</span>
          </div>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">{property.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full text-xs">
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <motion.button
          onClick={() => onInquire(property)}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Inquire About This Property
        </motion.button>
      </div>
    </motion.div>
  );
};

const PropertiesPage = () => {
  const { openModal, setModalData } = useModal();
  const [filters, setFilters] = useState({
    minBedrooms: '',
    maxPrice: '',
    location: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInquire = (property) => {
    setModalData({ 
      property, 
      subject: `Inquiry about: ${property.title}` 
    });
    openModal();
  };
  
  const data = useStaticQuery(graphql`
    query {
      allPropertiesJson {
        nodes {
          id
          title
          location
          price
          bedrooms
          bathrooms
          area
          description
          features
          image
        }
      }
    }
  `);
  
  const properties = data.allPropertiesJson.nodes;
  
  // Apply filters
  const filteredProperties = properties.filter(property => {
    if (filters.minBedrooms && property.bedrooms < parseInt(filters.minBedrooms)) {
      return false;
    }
    if (filters.maxPrice) {
      const propertyPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
      const maxPrice = parseInt(filters.maxPrice);
      if (propertyPrice > maxPrice) {
        return false;
      }
    }
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Seo title="Properties - Puretime Property Purchasing" />
      
      {/* Hero Section */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-display font-semibold text-neutral-900 mb-6">
              Our Properties
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-neutral-700 mb-8">
              Discover our selection of properties available for quick purchase
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-700 mb-2 font-medium">Min. Bedrooms</label>
                <select 
                  name="minBedrooms" 
                  value={filters.minBedrooms} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-neutral-700 mb-2 font-medium">Max. Price</label>
                <select 
                  name="maxPrice" 
                  value={filters.maxPrice} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="">Any</option>
                  <option value="200000">£200,000</option>
                  <option value="300000">£300,000</option>
                  <option value="400000">£400,000</option>
                  <option value="500000">£500,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-neutral-700 mb-2 font-medium">Location</label>
                <input 
                  type="text" 
                  name="location" 
                  value={filters.location} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Manchester"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Properties Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {filteredProperties.length > 0 ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((property) => (
                <motion.div key={property.id} variants={fadeIn}>
                  <PropertyCard property={property} onInquire={handleInquire} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">No properties match your filters</h3>
              <p className="text-neutral-600 mb-8">Try adjusting your search criteria to see more results.</p>
              <button 
                onClick={() => setFilters({ minBedrooms: '', maxPrice: '', location: '' })}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              We have access to many more properties not listed here. Contact us with your requirements and we'll help you find the perfect property.
            </p>
            <motion.button
              onClick={() => {
                setModalData({ subject: "General Property Inquiry" });
                openModal();
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PropertiesPage; 