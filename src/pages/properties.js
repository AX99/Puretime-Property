import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import PageHero from '../components/PageHero'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'
import PropertyFilter from '../components/PropertyFilter'
import ContactButton from '../components/ContactButton'
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
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  
  // Get properties from Sanity data
  const allProperties = data?.allSanityProperty?.nodes || [];
  const heroImage = getImage(data.propertiesHero);
  
  const initialFilters = {
    minBedrooms: '',
    maxPrice: '',
    location: '',
    propertyType: '',
    status: '',
    sortBy: 'newest',
    includeSold: true
  };
  
  const [filters, setFilters] = useState(initialFilters);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const resetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Define available property statuses
  const propertyStatuses = [
    {title: 'For Sale', value: 'for-sale'},
    {title: 'Sold', value: 'sold'},
    {title: 'For Rent', value: 'for-rent'},
    {title: 'Rented', value: 'rented'}
  ];
  
  // Check if any filters are active
  const hasActiveFilters = Object.entries(filters).some(([key, value]) => 
    key !== 'sortBy' && key !== 'includeSold' && value !== ''
  );
  
  // Filter properties based on user selections
  const filteredProperties = allProperties.filter(property => {
    // Exclude sold properties if includeSold is unchecked
    if (filters.includeSold === false && property.status === 'sold') {
      return false;
    }

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
  
  // Sort properties based on user selection
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch(filters.sortBy) {
      case 'newest':
        return new Date(b.publishedAt || b._createdAt || 0) - new Date(a.publishedAt || a._createdAt || 0);
      case 'oldest':
        return new Date(a.publishedAt || a._createdAt || 0) - new Date(b.publishedAt || b._createdAt || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'beds-high':
        return (b.bedrooms || 0) - (a.bedrooms || 0);
      case 'beds-low':
        return (a.bedrooms || 0) - (b.bedrooms || 0);
      default:
        return 0;
    }
  });
  
  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = sortedProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);
  
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
      
      <PageHero 
        titleJSX={<>Our <span className="italic text-primary-600">Properties</span></>}
        subtitle="Browse our selection of available and past properties. Filter by your preferences to find your perfect home."
        eyebrowText="PROPERTIES"
        heroImage={heroImage}
      />
      
      {/* Properties Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-neutral-100">
        <div className="container mx-auto px-4">
          <PropertyFilter 
            filters={filters}
            handleInputChange={handleInputChange}
            propertyTypes={propertyTypes}
            propertyStatuses={propertyStatuses}
            locations={locations}
          />
          
          {sortedProperties.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-semibold mb-4">No properties match your search criteria</h3>
              <p className="text-neutral-600 mb-8">Try adjusting your filters to see more results.</p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Reset All Filters
                </button>
              )}
            </motion.div>
          ) : (
            <>
              <p className="text-neutral-600 mb-6">
                {sortedProperties.length} {sortedProperties.length === 1 ? 'property' : 'properties'} found
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="ml-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Reset filters
                  </button>
                )}
              </p>
              
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
                    <PropertyCard property={property} />
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
      
      {/* Call to Action */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
              Need help with <span className="italic">property finance</span>?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/90 mb-8">
              Whether you're looking for a buy-to-let mortgage, bridging finance, or development funding, our trusted network of finance specialists can help you secure the right deal for your property goals.
            </motion.p>
            <motion.div 
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactButton
                formType={FORM_TYPES.BROKER_REFERRAL}
                buttonText="Speak to a Finance Specialist"
                buttonClass="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default PropertiesPage

export const query = graphql`
  query {
    propertiesHero: file(relativePath: { eq: "assets/properties-hero.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90)
      }
    }
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
            gatsbyImageData(
              width: 600
              height: 400
              placeholder: BLURRED
              formats: [AVIF, WEBP]
              layout: CONSTRAINED
            )
          }
        }
        images {
          asset {
            gatsbyImageData(
              width: 600
              height: 400
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
        tenure
        councilTaxBand  
        _createdAt

      }
    }
  }
` 