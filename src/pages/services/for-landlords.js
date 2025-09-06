import React from 'react'
import { motion } from 'framer-motion'
import Seo from '../../components/seo'
import HeroVariant from '../../components/HeroVariant'
import ServiceGrid from '../../components/ServiceGrid'
import CTABanner from '../../components/CTABanner'
import { useModal, FORM_TYPES } from '../../context/modalContext'

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

const ForLandlordsPage = () => {
  const { toggleModal } = useModal();

  // Streamlined service data - consolidated from 6 to 3 core services
  const services = [
    {
      title: "Full Property Management",
      description: "Complete hands-off property management including tenant sourcing, rent collection, maintenance coordination, and ongoing property care for maximum rental yields.",
      benefits: [
        "Professional tenant vetting & sourcing",
        "Guaranteed rent collection & arrears management",
        "24/7 maintenance response with trusted contractors",
        "Regular property inspections & reporting",
        "Full compliance & legal protection"
      ],
      tags: ["Most Popular", "Complete Service", "Stress-Free"],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>`,
      ctaText: "Get Management Quote",
      formType: FORM_TYPES.PROPERTY_MANAGEMENT
    },
    {
      title: "Tenant Find & Compliance",
      description: "Professional tenant sourcing with comprehensive vetting plus full compliance management to ensure legal protection and quality tenants.",
      benefits: [
        "Credit & reference checks with interview process",
        "EPC & gas safety certificate coordination", 
        "Right to Rent verification & deposit protection",
        "Selective licensing & electrical safety compliance",
        "Tenancy agreement preparation & legal setup"
      ],
      tags: ["Legal Protection", "Quality Tenants"],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>`,
      ctaText: "Find Quality Tenants",
      formType: FORM_TYPES.PROPERTY_MANAGEMENT
    },
    {
      title: "Maintenance & Financial Reporting",
      description: "24/7 maintenance coordination with trusted contractors plus comprehensive financial reporting and portfolio management for complete peace of mind.",
      benefits: [
        "24/7 emergency maintenance response",
        "Vetted contractor network with quality assurance",
        "Monthly financial statements & expense tracking",
        "Tax preparation support & yield optimization",
        "Portfolio performance analysis & advice"
      ],
      tags: ["24/7 Support", "Financial Control"],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>`,
      ctaText: "Get Support Package",
      formType: FORM_TYPES.PROPERTY_MANAGEMENT
    }
  ];

  // Streamlined support timeline - reduced from 6 to 3 key response times
  const supportTimeline = [
    { time: "Within 2 hours", service: "Emergency maintenance response" },
    { time: "24 hours", service: "Management quote delivery" },
    { time: "Monthly", service: "Detailed financial statements" }
  ];

  return (
    <>
      <Seo title="For Landlords - Stress-Free Property Management | Puretime Property" />
      
      {/* Hero Section */}
      <HeroVariant
        variant="supportive"
        eyebrowText="FOR LANDLORDS"
        title={<>Stop <span class='italic text-primary-600'>Stressing</span> About Property Management</>}
        subtitle="Let our expert team handle everything from tenant sourcing to compliance whilst you enjoy stress-free rental income."
        ctaText="Get Management Quote"
        formType={FORM_TYPES.PROPERTY_MANAGEMENT}
      />

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-center text-display-md font-display font-semibold text-neutral-900 mb-16">
              From <span className="italic text-neutral-600">Stressed</span> to <span className="italic text-primary-600">Stress-Free</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Current Problems */}
              <motion.div variants={fadeIn} className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-neutral-700 mb-8">Current Landlord Challenges</h3>
                <div className="space-y-4">
                  {[
                    "3am emergency maintenance calls",
                    "Void periods costing £1,500+ per month",
                    "Compliance regulations changing constantly",
                    "Problem tenants and rent arrears",
                    "Time-consuming admin and paperwork",
                    "Unexpected repair costs and contractor issues"
                  ].map((problem, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-neutral-700">{problem}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Our Solutions */}
              <motion.div variants={fadeIn} className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-primary-700 mb-8">Our Management Solutions</h3>
                <div className="space-y-4">
                  {[
                    "24/7 contractor network handles emergencies",
                    "Average void period reduced to under 2 weeks",
                    "Full compliance handled - we track all changes",
                    "Professional tenant vetting - 95% success rate",
                    "Complete admin management via online portal",
                    "Fixed-price maintenance with transparent costs"
                  ].map((solution, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-700 font-medium">{solution}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Simple compliance statement */}
            <motion.div variants={fadeIn} className="text-center mt-16 p-8 bg-primary-50 rounded-xl">
              <h3 className="text-xl font-bold text-primary-700 mb-4">Full Compliance Handled</h3>
              <p className="text-neutral-700 max-w-2xl mx-auto">
                We stay ahead of all regulatory changes including EPC certificates, gas safety, electrical inspections, 
                selective licensing, and deposit protection - giving you complete peace of mind.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Grid - Streamlined to 3 services */}
      <ServiceGrid 
        services={services}
        titleJSX={<>Choose Your <span class='italic text-primary-600'>Management</span> Level</>}
        description="From full hands-off management to targeted support services - we have the right solution for your portfolio."
        variant="supportive"
        formType={FORM_TYPES.PROPERTY_MANAGEMENT}
      />

      {/* Support Timeline - Streamlined to 3 key response times */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-center text-display-md font-display font-semibold text-neutral-900 mb-16">
              Our <span className="italic text-primary-600">Support</span> Promise
            </motion.h2>
            
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8 md:items-stretch md:justify-center">
              {supportTimeline.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full md:flex-1 p-6 bg-primary-50 flex flex-col md:flex-row items-center text-center md:text-left"
                >
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary-700 mb-2">{item.time}</div>
                    <div className="text-neutral-700">{item.service}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exit Strategy Integration */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-display-md font-display font-semibold text-neutral-900 mb-8">
              Need an <span className="italic text-primary-600">Exit Strategy</span>?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-neutral-700 mb-8">
              Sometimes the best property management solution is a quick, hassle-free sale. 
              If you're looking to exit the rental market or need immediate liquidity, 
              we can provide a cash offer within 24 hours.
            </motion.p>
            
            <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-700 mb-4">Continue Renting</h3>
                <p className="text-neutral-700 mb-4">Let us manage your property professionally while you enjoy stress-free rental income.</p>
                <button 
                  onClick={() => toggleModal({ type: FORM_TYPES.PROPERTY_MANAGEMENT })}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Get Management Quote
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-700 mb-4">Quick Sale</h3>
                <p className="text-neutral-700 mb-4">Get a cash offer within 24 hours and complete the sale in as little as 30 days.</p>
                <button 
                  onClick={() => toggleModal({ type: FORM_TYPES.PROPERTY_SELLER })}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Get Cash Offer
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABanner
        headingJSX={<>Ready for <span className="italic">Stress-Free</span> Property Management?</>}
        description="Join hundreds of landlords who've reclaimed their time and peace of mind with our professional management services."
        buttonText="Let Us Handle Everything"
        variant="supportive"
        icon="shield-check"
        formType={FORM_TYPES.PROPERTY_MANAGEMENT}
      />
    </>
  )
}

export default ForLandlordsPage