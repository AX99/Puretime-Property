import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import CTABanner from './CTABanner'
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

const Reviews = () => {
  // State to track expanded reviews
  const [expandedReviews, setExpandedReviews] = useState({});
  const scrollContainerRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  
  // Toggle review expansion
  const toggleReview = (id) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Check if scroll controls should be shown
  useEffect(() => {
    const checkForOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowControls(scrollWidth > clientWidth);
      }
    };
    
    // Check on initial load and when window resizes
    checkForOverflow();
    window.addEventListener('resize', checkForOverflow);
    
    return () => window.removeEventListener('resize', checkForOverflow);
  }, []);

  // Sample reviews data - replace with your actual Google Reviews when connected
  const reviews = [
    {
      id: 1,
      name: 'Mubeen Saeed',
      rating: 5,
      review: 'Puretime Property Purchasing Ltd is highly professional very good quality costumer services provider, I have wonderful experience very knowledgeable agents works colossally with me and kept me informed on every step unlike other high street agents. I would recommend and anyone interested to sell their property must contact them.💐',
      date: '8 months ago'
    },
    {
      id: 2,
      name: 'Imaduddin Sharif',
      rating: 5,
      review: 'I sold my flat through Mr Charles of Puretime. The overall service was excellent and they met my objective to my satisfaction. The process took slightly longer than my expectations and this was due to delays from my tenant and as I am not based in UK, Charles took the initiative on my request and dealt with the on the ground issues diligently dealing with the tenant professionally. He kept me updated and was always responsive to my questions. Highly recommend based on my personal experience.',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Emmanuel Addo',
      rating: 5,
      review: 'I had an amazing experience with Puretime Property Purchasing Ltd during my mortgage process. Their team was professional, knowledgeable, and always available to answer my questions and guide me through each step. They made what can often be a stressful experience feel smooth and manageable. I truly appreciate their support and dedication, and I highly recommend Puretime to anyone needing help with buying a property or securing a mortgage.',
      date: '3 weeks ago'
    }
  ]

  // Function to truncate text
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Scroll functions for the carousel
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const reviewWidth = document.querySelector('.review-card').offsetWidth;
      const scrollAmount = direction === 'left' ? -reviewWidth : reviewWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    return stars
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <StaticImage 
          src="../images/assets/livingroom.jpg"
          alt="Background pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              variants={fadeIn} 
              className="text-display-md md:text-display-lg font-display font-semibold text-neutral-900 mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
            <motion.p 
              variants={fadeIn}
              className="text-body-lg md:text-body-xl text-neutral-700 max-w-2xl mx-auto"
            >
              Don't just take our word for it. See what our satisfied clients have to say about their experience selling their properties to us.
            </motion.p>
          </div>
          
          {/* Google Reviews Badge */}
          <motion.div 
            variants={fadeIn}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center bg-white py-3 px-6 rounded-full shadow-md">
              <div className="flex items-center justify-center bg-white w-8 h-8 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path 
                    fill="#4285F4" 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                  />
                  <path 
                    fill="#34A853" 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                  />
                  <path 
                    fill="#FBBC05" 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                  />
                  <path 
                    fill="#EA4335" 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                  />
                </svg>
              </div>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {renderStars(5)}
                </div>
                {/* <span className="text-neutral-800 font-semibold">4.9/5 from 27 reviews</span> */}
              </div>
            </div>
          </motion.div>
          
          {/* Reviews Carousel with Side Navigation */}
          <motion.div 
            variants={fadeIn}
            className="relative"
          >
            {/* Left scroll button - hidden on mobile, shown on sides for desktop */}
            {showControls && (
              <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <button 
                  onClick={() => scroll('left')} 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-100 transition-all focus:outline-none"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Right scroll button - hidden on mobile, shown on sides for desktop */}
            {showControls && (
              <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <button 
                  onClick={() => scroll('right')} 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-100 transition-all focus:outline-none"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-8 scrollbar-hide snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-full md:w-[350px] md:px-4 snap-start review-card"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-xl font-bold text-primary-600 mr-4 flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{review.name.split(' ')[0]+" "+ review.name.split(' ')[1][0]}</h4>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-neutral-500 text-sm">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-neutral-700">
                        {expandedReviews[review.id] ? review.review : truncateText(review.review)}
                      </p>
                      {review.review.length > 120 && (
                        <button 
                          onClick={() => toggleReview(review.id)}
                          className="text-primary-600 font-medium hover:text-primary-700 transition-colors mt-2 focus:outline-none"
                        >
                          {expandedReviews[review.id] ? 'Read less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile scroll buttons - shown below reviews */}
            {showControls && (
              <div className="flex justify-center md:hidden mt-6 space-x-4">
                <button 
                  onClick={() => scroll('left')} 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-100 transition-all focus:outline-none"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => scroll('right')} 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-neutral-100 transition-all focus:outline-none"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
          
          {/* View All Reviews Button */}
          <motion.div 
            variants={fadeIn}
            className="text-center mt-10 mb-20"
          >
            <a 
              href="https://www.google.com/search?q=Puretime+Property+Purchasing&stick=H4sIAAAAAAAA_-NgU1I1qEg0TUoxMjU0T0lNsjA2sTC0MqhINjGwSEw0MbMEAkOTJJNFrDIBpUWpJZm5qQoBRfkFqUUllQpAkeSMxOLMvHQAIPyycEgAAAA&hl=en-GB&mat=CTdHwHQFsiqdElcBmzl_pQaO-2t73UECZg3Acl5QVdnS5zIp-g8aoK6DOIljv2fL7KSv9v62pXHR4KRhT3e9YMLNifHyL8qKKYcjVzRipq0NN7ILFp66ALadUZ7DTLpLTRE&authuser=0&ved=2ahUKEwjx7L_A66WNAxX9ZkEAHQbXATAQ-MgIegQIKhAe#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-md"
            >
              View all Google Reviews
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews 