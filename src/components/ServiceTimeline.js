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
 * ServiceTimeline - Timeline layout for homeowner services
 * @param {Array} services - Array of service objects
 * @param {string|React.ReactNode} title - Section title (legacy; prefer titleJSX)
 * @param {React.ReactNode} titleJSX - JSX title content (takes precedence over title)
 * @param {string} description - Section description
 * @param {string} formType - Form type for CTAs
 */
const ServiceTimeline = ({ 
  services = [], 
  title = "Our Services",
  titleJSX = null,
  description = "",
  formType = FORM_TYPES.PROPERTY_SELLER
}) => {
  const { openModal } = useModal()

  const handleServiceClick = (serviceFormType = formType) => {
    openModal({ type: serviceFormType });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
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
              className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-4"
            >
              {titleJSX || title}
            </motion.h2>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
            {description && (
              <motion.p 
                variants={fadeIn}
                className="text-lg text-neutral-700 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200"></div>

            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                } ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-100 hover:shadow-xl transition-all duration-300">
                    {/* Service icon */}
                    <div className={`w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4 ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    }`}>
                      {service.icon && (
                        <div className="w-8 h-8 text-primary-600" dangerouslySetInnerHTML={{ __html: service.icon }} />
                      )}
                    </div>

                    {/* Service content */}
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-neutral-700 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Service features */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-body-sm text-neutral-600">
                            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Timeline step number */}
                    <div className={`inline-flex items-center bg-primary-600 text-white px-3 py-1 rounded-full text-body-sm font-semibold mb-4`}>
                      Step {index + 1}
                    </div>

                    {/* Service CTA */}
                    {service.ctaText && (
                      <button
                        onClick={() => handleServiceClick(service.formType)}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                      >
                        {service.ctaText}
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Spacer for even layout on desktop */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>

          {/* Overall CTA */}
          <div className="text-center mt-16">
            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleServiceClick()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceTimeline
