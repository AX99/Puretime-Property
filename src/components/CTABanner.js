import React from 'react'
import { motion } from 'framer-motion'
import { useModal, FORM_TYPES } from '../context/modalContext'

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
 * Reusable CTA Banner component
 * @param {Object} props - Component props
 * @param {string} props.heading - The heading text for the CTA
 * @param {string} props.description - The description text for the CTA
 * @param {string} props.buttonText - The text for the CTA button (defaults to "Get Your Free Cash Offer")
 * @param {string} props.className - Additional CSS classes for the container
 * @param {string} props.formType - The type of form to display (defaults to PROPERTY_SELLER)
 * @param {Object} props.data - Additional data to pass to the form
 */
const CTABanner = ({ 
  heading = "Ready to sell your property?", 
  description = "Contact us today for a no-obligation cash offer. We can complete the purchase in as little as 30 days.", 
  buttonText = "Get Your Free Cash Offer",
  className = "",
  formType = FORM_TYPES.PROPERTY_SELLER,
  data = null
}) => {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal({
      type: formType,
      data: data
    });
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className={`max-w-4xl mx-auto bg-gradient-to-b from-primary-600 to-neutral-300 p-8 md:p-12 rounded-2xl shadow-xl text-center ${className}`}
    >
      <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
        {heading}
      </h3>
      <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
        {description}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={handleClick}
        className="bg-white text-primary-600 hover:bg-neutral-100 px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-md"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  )
}

export default CTABanner 