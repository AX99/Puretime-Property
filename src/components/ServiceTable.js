import React, { useState } from 'react'
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
      staggerChildren: 0.1
    }
  }
}

/**
 * ServiceTable - Data-rich table layout for investor services with metrics
 * @param {Array} services - Array of service objects
 * @param {string} title - Section title
 * @param {string} description - Section description
 * @param {string} formType - Form type for CTAs
 * @param {boolean} showComparison - Whether to show comparison table
 */
const ServiceTable = ({ 
  services = [], 
  title = "Investment Services",
  description = "",
  formType = FORM_TYPES.BROKER_REFERRAL,
  showComparison = true
}) => {
  const { openModal } = useModal()
  const [selectedService, setSelectedService] = useState(null)

  const handleServiceClick = (serviceFormType = formType) => {
    openModal({ type: serviceFormType });
  };

  const handleServiceSelect = (serviceIndex) => {
    setSelectedService(selectedService === serviceIndex ? null : serviceIndex);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
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
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-700 mx-auto mb-6"></motion.div>
            {description && (
              <motion.p 
                variants={fadeIn}
                className="text-lg text-neutral-700 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Services Comparison Table */}
          {showComparison && services.length > 0 && (
            <motion.div variants={fadeIn} className="mb-16 overflow-x-auto">
              <div className="bg-white rounded-xl shadow-lg border border-neutral-200 min-w-full">
                <table className="w-full">
                                        <thead>
                    <tr className="border-b border-neutral-200 bg-primary-50">
                      <th className="px-6 py-4 text-left font-semibold text-neutral-900">Service Type</th>
                      <th className="px-6 py-4 text-center font-semibold text-neutral-900">LTV Ratio</th>
                      <th className="px-6 py-4 text-center font-semibold text-neutral-900">Typical Rate</th>
                      <th className="px-6 py-4 text-center font-semibold text-neutral-900">Max Term</th>
                      <th className="px-6 py-4 text-center font-semibold text-neutral-900">Speed</th>
                      <th className="px-6 py-4 text-center font-semibold text-neutral-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <motion.tr 
                        key={index}
                        variants={fadeIn}
                        className={`border-b border-neutral-100 hover:bg-blue-25 transition-colors cursor-pointer ${
                          selectedService === index ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleServiceSelect(index)}
                        role="button"
                        aria-label={`Select ${service.title} service for more details`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleServiceSelect(index);
                          }
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              {service.icon && (
                                <div className="w-5 h-5 text-blue-600" dangerouslySetInnerHTML={{ __html: service.icon }} />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-neutral-900">{service.title}</div>
                              <div className="text-body-sm text-neutral-600">{service.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-blue-600">{service.ltvRatio}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-neutral-900">{service.typicalRate}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-neutral-700">{service.maxTerm}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-body-xs font-medium ${
                            service.speed === 'Fast' ? 'bg-green-100 text-green-800' :
                            service.speed === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {service.speed}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceClick(service.formType);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-body-sm transition-colors"
                          >
                            Enquire
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Detailed Service Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      {service.icon && (
                        <div className="w-6 h-6 text-blue-600" dangerouslySetInnerHTML={{ __html: service.icon }} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">{service.title}</h3>
                      <p className="text-body-sm text-neutral-600">{service.subtitle}</p>
                    </div>
                  </div>
                  {service.featured && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-body-xs font-semibold">
                      Popular
                    </span>
                  )}
                </div>

                {/* Service Description */}
                <p className="text-neutral-700 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{service.ltvRatio}</div>
                    <div className="text-body-sm text-neutral-600">Max LTV</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{service.typicalRate}</div>
                    <div className="text-body-sm text-neutral-600">From</div>
                  </div>
                </div>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-body-sm text-neutral-700">
                        <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* ROI Calculator placeholder */}
                {service.showCalculator && (
                  <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-neutral-900">Quick ROI Calculator</span>
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-body-sm text-neutral-600">
                      Calculate potential returns with this finance option
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleServiceClick(service.formType)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {service.ctaText || 'Get Quote'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Market Insights Section */}
          <motion.div 
            variants={fadeIn}
            className="bg-gradient-to-r from-blue-50 to-neutral-50 p-8 rounded-2xl mb-16"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">£2.4M</div>
                <div className="text-body-sm text-neutral-600">Average Weekly Lending</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">48hrs</div>
                <div className="text-body-sm text-neutral-600">Average Decision Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-body-sm text-neutral-600">Client Satisfaction</div>
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              Speak to Investment Specialist
            </motion.button>
            <motion.p 
              variants={fadeIn}
              className="mt-4 text-body-sm text-neutral-600"
            >
              Free consultation • Competitive rates • Expert advice
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceTable
