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
 * Reusable CTA Banner component with audience variants
 * @param {Object} props - Component props
 * @param {string|React.ReactNode} props.heading - The heading text for the CTA (prefer headingJSX for styled content)
 * @param {React.ReactNode} props.headingJSX - JSX content for the heading (takes precedence over heading)
 * @param {string} props.description - The description text for the CTA
 * @param {string} props.buttonText - The text for the CTA button
 * @param {string} props.variant - The visual variant ("urgent", "business", "supportive", "default")
 * @param {string} props.icon - Icon type for the banner ("clock", "chart-up", "shield-check")
 * @param {string} props.className - Additional CSS classes for the container
 * @param {string} props.formType - The type of form to display (defaults to PROPERTY_SELLER)
 * @param {Object} props.data - Additional data to pass to the form
 */
const CTABanner = ({ 
  heading = "Ready to sell your property?",
  headingJSX = null,
  description = "Contact us today for a no-obligation cash offer. We can complete the purchase in as little as 30 days.", 
  buttonText = "Get Your Free Cash Offer",
  variant = "default",
  icon = null,
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

  // Variant styling configurations - using consistent brand colors
  const variantStyles = {
    default: {
      gradient: "bg-gradient-to-b from-primary-600 to-primary-700",
      textColor: "text-white",
      buttonBg: "bg-white",
      buttonText: "text-primary-600",
      buttonHover: "hover:bg-neutral-100"
    },
    urgent: {
      gradient: "bg-gradient-to-br from-primary-600 to-primary-700",
      textColor: "text-white",
      buttonBg: "bg-white",
      buttonText: "text-primary-600",
      buttonHover: "hover:bg-neutral-100 font-bold"
    },
    business: {
      gradient: "bg-gradient-to-br from-primary-700 to-primary-600",
      textColor: "text-white",
      buttonBg: "bg-white",
      buttonText: "text-primary-700",
      buttonHover: "hover:bg-neutral-100 font-semibold"
    },
    supportive: {
      gradient: "bg-gradient-to-br from-primary-600/80 to-primary-600",
      textColor: "text-white",
      buttonBg: "bg-white",
      buttonText: "text-primary-600",
      buttonHover: "hover:bg-neutral-100 font-medium rounded-lg"
    }
  };

  const currentStyle = variantStyles[variant] || variantStyles.default;

  // Icon components
  const IconComponent = ({ type }) => {
    const iconClass = "w-8 h-8 mb-4 mx-auto";
    
    switch (type) {
      case "clock":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "chart-up":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "shield-check":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className={`max-w-4xl mx-auto ${currentStyle.gradient} p-8 md:p-12 rounded-2xl shadow-xl text-center ${className}`}
    >
      {icon && (
        <div className={currentStyle.textColor}>
          <IconComponent type={icon} />
        </div>
      )}
      <h3 className={`text-2xl md:text-3xl font-display font-semibold ${currentStyle.textColor} mb-4`}>
        {headingJSX || heading}
      </h3>
      <p className={`${currentStyle.textColor}/90 text-lg max-w-3xl mx-auto mb-8`}>
        {description}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={handleClick}
        className={`${currentStyle.buttonBg} ${currentStyle.buttonText} ${currentStyle.buttonHover} px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-md`}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  )
}

export default CTABanner 