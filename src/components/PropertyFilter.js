import React from 'react'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const PropertyFilter = ({ filters, handleInputChange, propertyTypes, propertyStatuses, locations }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 mb-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div>
          <label htmlFor="minBedrooms" className="block text-sm font-medium text-neutral-700 mb-2">
            Min. Bedrooms
          </label>
          <select 
            id="minBedrooms"
            name="minBedrooms" 
            value={filters.minBedrooms} 
            onChange={handleInputChange}
            className="w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
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
          <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 mb-2">
            Max. Price (£)
          </label>
          <select 
            id="maxPrice"
            name="maxPrice" 
            value={filters.maxPrice} 
            onChange={handleInputChange}
            className="w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Any</option>
            <option value="100000">£100,000</option>
            <option value="200000">£200,000</option>
            <option value="300000">£300,000</option>
            <option value="500000">£500,000</option>
            <option value="750000">£750,000</option>
            <option value="1000000">£1,000,000</option>
            <option value="2000000">£2,000,000+</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Statuses</option>
            {propertyStatuses.map((status, i) => (
              <option key={i} value={status.value}>
                {status.title}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
            Location
          </label>
          <input 
            type="text" 
            id="location"
            name="location" 
            list="location-list"
            value={filters.location} 
            onChange={handleInputChange} 
            placeholder="Any location"
            className="w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
          <datalist id="location-list">
            {locations.map((location, i) => (
              <option key={i} value={location} />
            ))}
          </datalist>
        </div>
        
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-2">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleInputChange}
            className="w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Any</option>
            {propertyTypes.map((type, i) => (
              <option key={i} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertyFilter 