import React from 'react'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
  }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

/**
 * Enhanced Hero component with audience-specific variants
 * @param {string} variant - The visual variant ("urgency", "business", "supportive", "default")
 * @param {string|React.ReactNode} title - Main heading (legacy; prefer titleJSX for styled content)
 * @param {React.ReactNode} titleJSX - JSX heading content (takes precedence over title)
 * @param {string} subtitle - Support text below the heading
 * @param {string} eyebrowText - Optional label text displayed above heading
 * @param {Object} heroImage - Gatsby image data from graphql query
 * @param {string} imageObjectPosition - CSS object-position for hero image (e.g., 'center 50%')
 * @param {string} imageObjectFit - CSS object-fit for hero image (e.g., 'cover', 'contain')
 * @param {string} ctaText - Call-to-action button text
 * @param {string} formType - Form type to trigger
 * @param {boolean} showStats - Whether to display statistics
 * @param {Array} stats - Array of stat objects {value, label}
 * @param {boolean} splitLayout - Whether to use split layout for business variant
 * @param {string} className - Additional CSS classes
 */
const HeroVariant = ({ 
  variant = "default",
  title, 
  titleJSX,
  subtitle, 
  eyebrowText, 
  heroImage,
  imageObjectPosition = "center 50%",
  imageObjectFit = "cover",
  ctaText,
  formType = FORM_TYPES.PROPERTY_SELLER,
  showStats = false,
  stats = [],
  splitLayout = false,
  className = "" 
}) => {
  const { openModal } = useModal()

  // Deprecated: createMarkup was used for HTML strings in title. Prefer titleJSX.

  const handleCTAClick = () => {
    openModal({ type: formType });
  };

  // Variant configurations - using consistent brand colors with different treatments
  const variantConfig = {
    default: {
      background: "bg-gradient-to-b from-neutral-50 to-white",
      titleColor: "text-neutral-900",
      subtitleColor: "text-neutral-700",
      eyebrowBg: "bg-primary-600/10",
      eyebrowText: "text-primary-600",
      dividerColor: "bg-primary-600",
      ctaButton: "bg-primary-600 hover:bg-primary-700 text-white"
    },
    urgency: {
      background: "bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700",
      titleColor: "text-white",
      subtitleColor: "text-white/90",
      eyebrowBg: "bg-white/20",
      eyebrowText: "text-white",
      dividerColor: "bg-white",
      ctaButton: "bg-white text-primary-600 hover:bg-neutral-100 font-bold"
    },
    business: {
      background: "bg-gradient-to-br from-neutral-50 to-white border-l-4 border-primary-700",
      titleColor: "text-neutral-900",
      subtitleColor: "text-neutral-700",
      eyebrowBg: "bg-primary-700/10",
      eyebrowText: "text-primary-700",
      dividerColor: "bg-primary-700",
      ctaButton: "bg-primary-700 hover:bg-primary-600 text-white font-semibold"
    },
    supportive: {
      background: "bg-gradient-to-br from-primary-600/10 via-primary-100/50 to-white",
      titleColor: "text-neutral-900",
      subtitleColor: "text-neutral-700",
      eyebrowBg: "bg-primary-600/20",
      eyebrowText: "text-primary-700",
      dividerColor: "bg-primary-600",
      ctaButton: "bg-primary-600/80 hover:bg-primary-600 text-white font-medium rounded-lg"
    }
  };

  const currentConfig = variantConfig[variant] || variantConfig.default;

  // Stats component for business variant
  const StatsDisplay = () => (
    <motion.div 
      variants={fadeIn}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
            {stat.value}
          </div>
          <div className="text-body-sm text-neutral-600 uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );

  // Urgency indicator for urgent variant
  const UrgencyIndicator = () => (
    <motion.div 
      variants={fadeIn}
      className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full mb-6"
    >
      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-semibold text-body-sm">Fast Track Available</span>
    </motion.div>
  );

  return (
    <section className={`${currentConfig.background} py-16 md:py-24 relative ${className}`}>
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        {heroImage ? (
          <GatsbyImage 
            image={heroImage}
            alt="Background" 
            className="w-full h-full"
            objectPosition={imageObjectPosition}
            objectFit={imageObjectFit}
          />
        ) : (
          <div className="w-full h-full bg-neutral-100"></div>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {splitLayout && variant === "business" ? (
          // Split layout for business variant
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-left"
            >
              {eyebrowText && (
                <motion.div variants={fadeIn} className={`inline-block ${currentConfig.eyebrowBg} px-4 py-2 rounded-full mb-4`}>
                  <span className={`${currentConfig.eyebrowText} font-semibold tracking-wide uppercase text-body-md`}>
                    {eyebrowText}
                  </span>
                </motion.div>
              )}
              
              <motion.h1 
                variants={fadeInUp} 
                className={`font-display text-display-lg md:text-display-xl font-semibold ${currentConfig.titleColor} mb-6`}
              >
                {titleJSX || title}
              </motion.h1>
              
              <motion.div variants={fadeIn} className={`w-24 h-1 ${currentConfig.dividerColor} mb-8`}></motion.div>
              
              {subtitle && (
                <motion.p variants={fadeIn} className={`text-lg md:text-xl ${currentConfig.subtitleColor} mb-8`}>
                  {subtitle}
                </motion.p>
              )}

              {ctaText && (
                <motion.button
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTAClick}
                  className={`${currentConfig.ctaButton} px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg`}
                >
                  {ctaText}
                </motion.button>
              )}
            </motion.div>

            {/* Stats side for business variant */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center"
            >
              {showStats && stats.length > 0 && <StatsDisplay />}
            </motion.div>
          </div>
        ) : (
          // Centered layout for other variants
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            {variant === "urgency" && <UrgencyIndicator />}

            {eyebrowText && (
              <motion.div variants={fadeIn} className={`inline-block ${currentConfig.eyebrowBg} px-4 py-2 rounded-full mb-4`}>
                <span className={`${currentConfig.eyebrowText} font-semibold tracking-wide uppercase text-body-md`}>
                  {eyebrowText}
                </span>
              </motion.div>
            )}
            
            <motion.h1 
              variants={fadeInUp} 
              className={`font-display text-display-lg md:text-display-xl font-semibold ${currentConfig.titleColor} mb-6`}
            >
              {titleJSX || title}
            </motion.h1>
            
            <motion.div variants={fadeIn} className={`w-24 h-1 ${currentConfig.dividerColor} mx-auto mb-8`}></motion.div>
            
            {subtitle && (
              <motion.p variants={fadeIn} className={`text-lg md:text-xl ${currentConfig.subtitleColor} mb-8`}>
                {subtitle}
              </motion.p>
            )}

            {showStats && stats.length > 0 && variant === "business" && <StatsDisplay />}

            {ctaText && (
              <motion.button
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCTAClick}
                className={`${currentConfig.ctaButton} px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg`}
              >
                {ctaText}
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default HeroVariant
