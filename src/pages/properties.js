import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import { useModal } from '../context/modalContext'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'
import PropertyFilter from '../components/PropertyFilter'

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

const PropertiesPage = ({ data }) => {
  const { openModal, setModalData } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  
  // Get properties from Sanity data
  const allProperties = data?.allSanityProperty?.nodes || [];
  
  const [filters, setFilters] = useState({
    minBedrooms: '',
    maxPrice: '',
    location: '',
    propertyType: '',
    status: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleInquire = (property) => {
    setModalData({ 
      title: 'Property Inquiry',
      subtitle: `About: ${property.title}`,
      content: `
        <p class="mb-4">Please fill out the form below and we'll get back to you with more information about this property.</p>
        <p class="mb-4"><strong>Property:</strong> ${property.title}</p>
        <p class="mb-4"><strong>Location:</strong> ${property.location?.city || 'N/A'}</p>
        <p class="mb-4"><strong>Price:</strong> £${property.price?.toLocaleString() || 'N/A'}</p>
      `,
      formType: 'property',
      formData: {
        propertyId: property._id,
        propertyTitle: property.title,
      }
    });
    openModal('contact');
  };
  
  // Define available property statuses
  const propertyStatuses = [
    {title: 'For Sale', value: 'for-sale'},
    {title: 'Sold', value: 'sold'},
    {title: 'For Rent', value: 'for-rent'},
    {title: 'Rented', value: 'rented'}
  ];
  
  // Filter properties based on user selections
  const filteredProperties = allProperties.filter(property => {
    // Filter by minimum bedrooms
    if (filters.minBedrooms && (property.bedrooms < parseInt(filters.minBedrooms) || !property.bedrooms)) {
      return false;
    }
    
    // Filter by maximum price
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
      return false;
    }
    
    // Filter by location (city or state)
    if (filters.location && property.location) {
      const locationText = `${property.location.city || ''} ${property.location.state || ''}`.toLowerCase();
      if (!locationText.includes(filters.location.toLowerCase())) {
        return false;
      }
    }
    
    // Filter by property type
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }
    
    // Filter by status
    if (filters.status && property.status !== filters.status) {
      return false;
    }
    
    return true;
  });
  
  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  
  // Get unique property types for filter
  const propertyTypes = [...new Set(allProperties.map(p => p.propertyType).filter(Boolean))];
  
  // Get unique locations for filter suggestions
  const locations = [...new Set(
    allProperties
      .map(p => p.location?.city)
      .filter(Boolean)
  )];

  return (
    <>
      <Seo 
        title="Our Properties"
        description="Browse our selection of available and past properties for sale across the UK."
      />
      
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">Our Properties</h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Browse our selection of available and past properties. Filter by your preferences to find your perfect home.
            </p>
          </motion.div>
      
          <PropertyFilter 
            filters={filters}
            handleInputChange={handleInputChange}
            propertyTypes={propertyTypes}
            propertyStatuses={propertyStatuses}
            locations={locations}
          />
          
          {filteredProperties.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-semibold mb-4">No properties match your search criteria</h3>
              <p className="text-neutral-600 mb-8">Try adjusting your filters to see more results.</p>
            </motion.div>
          ) : (
            <>
              <p className="text-neutral-600 mb-6">{filteredProperties.length} properties found</p>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                {currentProperties.map(property => (
                  <motion.div 
                    key={property._id} 
                    variants={fadeIn}
                  >
                    <PropertyCard property={property} onInquire={handleInquire} />
                  </motion.div>
                ))}
              </motion.div>
                
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default PropertiesPage

export const query = graphql`
  query {
    allSanityProperty {
      nodes {
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
            gatsbyImageData(width: 600, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
        images {
          asset {
            gatsbyImageData(width: 600, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
        amenities
        featured
        status
        publishedAt
      }
    }
  }
` 