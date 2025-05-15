import React from 'react'
import { motion } from 'framer-motion'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

/**
 * SectionHeader - A reusable component for section headings
 * @param {string} title - The title text (can include HTML for styling)
 * @param {string} description - Optional description text below the title
 * @param {string} align - Text alignment ('center', 'left', or 'right')
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element}
 */
const SectionHeader = ({ 
  title, 
  description, 
  align = 'center',
  className = '' 
}) => {
  // Text alignment classes
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right'
  };

  // Function to safely render HTML in the title
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  // Divider alignment classes
  const dividerClasses = {
    center: 'mx-auto',
    left: 'ml-0',
    right: 'ml-auto'
  };

  return (
    <div className={`mb-16 ${alignClasses[align]} ${className}`}>
      <motion.h2 
        variants={fadeIn} 
        className="section-title"
        dangerouslySetInnerHTML={createMarkup(title)}
      />
      
      <motion.div 
        variants={fadeIn} 
        className={`w-20 h-1 bg-primary-600 mb-6 ${dividerClasses[align]}`}
      />
      
      {description && (
        <motion.p 
          variants={fadeIn} 
          className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeader 