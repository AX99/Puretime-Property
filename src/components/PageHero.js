import React from 'react'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'

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

/**
 * PageHero - A reusable hero component for page headers
 * @param {string|React.ReactNode} title - Main heading (legacy; prefer titleJSX)
 * @param {React.ReactNode} titleJSX - JSX heading content (takes precedence over title)
 * @param {string} subtitle - Support text below the heading
 * @param {string} eyebrowText - Optional label text displayed above heading
 * @param {Object} heroImage - Gatsby image data from graphql query
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element}
 */
const PageHero = ({ 
  title, 
  titleJSX = null,
  subtitle, 
  eyebrowText, 
  heroImage,
  className = "" 
}) => {

  return (
    <section className={`bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24 relative ${className}`}>
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        {heroImage ? (
          <GatsbyImage 
            image={heroImage}
            alt="Background" 
            className="w-full h-full"
            objectPosition="center 50%"
            objectFit="cover"
          />
        ) : (
          // Fallback for when image data is not available
          <div className="w-full h-full bg-neutral-100"></div>
        )}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-4xl mx-auto text-center"
        >
          {eyebrowText && (
            <motion.div variants={fadeIn} className="inline-block bg-primary-600/10 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold tracking-wide uppercase text-body-md">
                {eyebrowText}
              </span>
            </motion.div>
          )}
          
          <motion.h1 
            variants={fadeIn} 
            className="font-display text-display-lg md:text-display-xl font-semibold text-neutral-900 mb-6"
          >
            {titleJSX || title}
          </motion.h1>
          
          <motion.div variants={fadeIn} className="w-24 h-1 bg-primary-600 mx-auto mb-8"></motion.div>
          
          {subtitle && (
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-neutral-700 mb-8">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default PageHero 