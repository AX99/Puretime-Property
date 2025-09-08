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
      staggerChildren: 0.15
    }
  }
}

/**
 * ServiceGrid - Icon-based grid layout for landlord services with stress-relief focus
 * @param {Array} services - Array of service objects
 * @param {string|React.ReactNode} title - Section title (legacy; prefer titleJSX)
 * @param {React.ReactNode} titleJSX - JSX title content (takes precedence over title)
 * @param {string} description - Section description
 * @param {string} formType - Form type for CTAs
 * @param {string} variant - Visual variant ("supportive", "default")
 */
const ServiceGrid = ({ 
  services = [], 
  title = "Our Services",
  titleJSX = null,
  description = "",
  formType = FORM_TYPES.PROPERTY_MANAGEMENT,
  variant = "supportive"
}) => {
  const { openModal } = useModal()

  const handleServiceClick = (serviceFormType = formType) => {
    openModal({ type: serviceFormType });
  };

  // Variant configurations - using consistent brand colors
  const variantConfig = {
    default: {
      accentColor: "text-primary-600",
      borderColor: "border-primary-600",
      hoverBg: "hover:bg-primary-50",
      iconBg: "bg-primary-100"
    },
    supportive: {
      accentColor: "text-primary-600",
      borderColor: "border-primary-600",
      hoverBg: "hover:bg-primary-50",
      iconBg: "bg-primary-100"
    }
  };

  const currentConfig = variantConfig[variant] || variantConfig.default;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              variants={fadeIn} 
              className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-4"
            >
              {titleJSX || title}
            </motion.h2>
            <motion.div variants={fadeIn} className={`w-20 h-1 ${currentConfig.accentColor.replace('text', 'bg')} mx-auto mb-6`}></motion.div>
            {description && (
              <motion.p 
                variants={fadeIn}
                className="text-lg text-neutral-700 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`bg-white p-8 rounded-xl shadow-md border-t-4 ${currentConfig.borderColor} ${currentConfig.hoverBg} hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                onClick={() => handleServiceClick(service.formType)}
              >
                {/* Service Icon */}
                <div className={`w-16 h-16 ${currentConfig.iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon && (
                    <div className={`w-8 h-8 ${currentConfig.accentColor}`} dangerouslySetInnerHTML={{ __html: service.icon }} />
                  )}
                </div>

                {/* Service Content */}
                <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-neutral-700 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Benefits List */}
                {service.benefits && service.benefits.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start text-body-sm text-neutral-600">
                        <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Stress Relief Indicator
                {service.stressReliefLevel && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-body-sm text-neutral-600 mb-1">
                      <span>Stress Relief</span>
                      <span className="font-semibold">{service.stressReliefLevel}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <motion.div 
                        className="bg-primary-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${service.stressReliefLevel}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                )} */}

                {/* Service Features Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-body-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Service CTA */}
                <div className="flex items-center justify-between">
                  {service.ctaText && (
                    <span className={`font-semibold ${currentConfig.accentColor} group-hover:underline`}>
                      {service.ctaText}
                    </span>
                  )}
                  <svg className={`w-5 h-5 ${currentConfig.accentColor} group-hover:translate-x-1 transition-transform`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Problem/Solution Highlight */}
          <motion.div 
            variants={fadeIn}
            className="bg-gradient-to-r from-red-50 to-green-50 p-8 rounded-2xl mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-red-700 mb-4">
                  Stressed About Property Management?
                </h3>
                <ul className="space-y-2 text-red-600">
                  <li>• Late night tenant calls</li>
                  <li>• Compliance headaches</li>
                  <li>• Maintenance emergencies</li>
                  <li>• Void periods and rent arrears</li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  We Handle Everything For You
                </h3>
                <ul className="space-y-2 text-green-600">
                  <li>• 24/7 professional support</li>
                  <li>• Full regulatory compliance</li>
                  <li>• Trusted contractor network</li>
                  <li>• Guaranteed rent collection</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Overall CTA */}
          <div className="text-center">
            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleServiceClick()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg font-medium text-lg transition-colors shadow-lg"
            >
              Let Us Handle Everything
            </motion.button>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-body-sm text-neutral-600"
            >
              Free consultation • No obligation • Peace of mind guaranteed
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceGrid
