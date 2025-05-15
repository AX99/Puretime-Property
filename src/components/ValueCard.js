import React from 'react'
import { motion } from 'framer-motion'

/**
 * ValueCard - A reusable component for displaying value cards with icons
 * @param {React.ReactNode} icon - The icon component to display
 * @param {string} title - The card title
 * @param {string} description - The card description
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element}
 */
const ValueCard = ({ 
  icon,
  title, 
  description,
  className = '' 
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                border-t-4 border-primary-600 flex flex-col items-center md:items-start 
                text-center md:text-left ${className}`}
    >
      <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-700 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export default ValueCard 