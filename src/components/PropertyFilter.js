import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const PropertyFilter = ({ filters, handleInputChange, propertyTypes, propertyStatuses, locations }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <motion.div 
      className={`bg-white rounded-xl p-6 mb-12 ${isFilterOpen ? 'shadow-lg' : ''}`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex justify-end">
        <button 
          onClick={toggleFilter}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          {isFilterOpen ? (
            <>
              <FaFilter className="text-sm" />
              <span>Hide Filters</span>
              <FaChevronUp className="text-sm" />
            </>
          ) : (
            <>
              <FaFilter className="text-sm" />
              <span>Show Filters</span>
              <FaChevronDown className="text-sm" />
            </>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
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
                      <option key={i} value={location} aria-label={location} />
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

                <div>
                  <label htmlFor="sortBy" className="block text-sm font-medium text-neutral-700 mb-2">
                    Sort By
                  </label>
                  <select 
                    id="sortBy"
                    name="sortBy" 
                    value={filters.sortBy || 'newest'} 
                    onChange={handleInputChange}
                    className="w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="beds-high">Bedrooms: High to Low</option>
                    <option value="beds-low">Bedrooms: Low to High</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <input
                      type="checkbox"
                      name="includeSold"
                      checked={!!filters.includeSold}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <span>Include sold properties</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default PropertyFilter 