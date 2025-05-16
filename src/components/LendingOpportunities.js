import React from 'react'
import { motion } from 'framer-motion'
import { useModal, FORM_TYPES } from '../context/modalContext'
import { StaticImage } from 'gatsby-plugin-image'
import CTABanner from './CTABanner'
import ContactButton from './ContactButton'
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

const lendingOptions = [
  {
    title: "Bridging Finance",
    description: "Need short-term funding to secure a property quickly or bridge a gap between sale and purchase? Our network of specialist lenders offers competitive rates and quick decisions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    cta: "Enquire about bridging finance"
  },
  {
    title: "Buy-to-Let Mortgages",
    description: "Looking to expand your property portfolio? We can introduce you to brokers specialising in buy-to-let mortgages, including solutions for first-time landlords and complex scenarios.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    cta: "Enquire about buy-to-let mortgages"
  },
  {
    title: "Commercial Mortgages",
    description: "From retail units and offices to industrial properties and holiday lets, we can connect you with specialists who understand commercial property finance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    cta: "Enquire about commercial mortgages"
  },
  {
    title: "Development Finance",
    description: "Funding for property development projects large and small, from light refurbishments to ground-up builds. Our trusted partners can help secure up to 90% loan-to-cost.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 3h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      ),
    cta: "Enquire about development finance"
  }
];

const LendingOpportunities = () => {
  const { toggleModal } = useModal();

  return (
    <section className="py-16 md:py-24 bg-neutral-50 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <StaticImage 
          src="../images/assets/finance-bg.jpg"
          alt="Background pattern" 
          className="w-full h-full object-cover"
          placeholder="blurred"
          fallback="../images/assets/livingroom.jpg"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
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
              className="text-display-md md:text-display-lg font-display font-semibold text-neutral-900 mb-4"
            >
              Property <span className="italic text-primary-600">Finance</span> Solutions
            </motion.h2>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto"
            >
              We can introduce you to our trusted network of specialist brokers who provide tailored lending solutions for all types of property investment.
            </motion.p>
          </div>

          {/* Lending Options Grid */}
          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-8"
          >
            {lendingOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary-600 flex flex-col h-full"
              >
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:flex-row items-start mb-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3 md:mb-0 md:mr-4 flex-shrink-0">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mt-2 md:mt-0">{option.title}</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-6 flex-grow text-center md:text-left">
                  {option.description}
                </p>
                <button 
                  onClick={() => {
                    toggleModal({type : FORM_TYPES.BROKER_REFERRAL})
                  }}
                  className="mx-auto mt-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center transition-colors rounded-full px-6 py-2 shadow"
                >
                  {option.cta}
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Add CTA Banner */}
          <CTABanner 
            heading="Speak to a broker today" 
            description="We can introduce you to our trusted network of specialist brokers who provide tailored lending solutions for all types of property investment."
            buttonText="Enquire about lending solutions" 
            formType={FORM_TYPES.BROKER_REFERRAL}
            className='mt-10'
          />
        </motion.div>
      </div>
    </section>
  )
}

export default LendingOpportunities
