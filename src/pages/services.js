import React from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import { useModal } from '../context/modalContext'

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

const ServicesPage = () => {
  const { toggleModal } = useModal();
  
  return (
    <>
      <Seo title="Our Services - Puretime Property Purchasing" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24 relative">
        {/* Add a background image here */}
        <div className="absolute inset-0 z-0 opacity-20">
          <StaticImage 
            src="../images/assets/services-hero.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            objectPosition="center 50%" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="inline-block bg-primary-600/10 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold tracking-wide uppercase text-body-md">
                OUR SERVICES
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="font-display text-display-lg md:text-display-xl font-semibold text-neutral-900 mb-6">
              Fast, Flexible <span className="italic text-primary-600">Property</span> Solutions
            </motion.h1>
            
            <motion.div variants={fadeIn} className="w-24 h-1 bg-primary-600 mx-auto mb-8"></motion.div>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-neutral-700 mb-8">
              Whether you're looking to sell your home quickly or need help securing lending for your next purchase, our team and trusted partners are here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Seller Services */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-neutral-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2 
                variants={fadeIn} 
                className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-4"
              >
                For <span className="italic text-primary-600">Homeowners</span>
              </motion.h2>
              <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
              <motion.p 
                variants={fadeIn}
                className="text-lg text-neutral-700 max-w-3xl mx-auto"
              >
                We offer several services designed to make selling your property as smooth and hassle-free as possible.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quick Property Purchases */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Quick Property Purchases</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Our core service is purchasing properties quickly for cash. We can complete transactions in as little as 30 days, compared to the average 3-6 months with traditional sales.
                </p>
              </motion.div>
              
              {/* Flexible Completion Dates */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Flexible Completion Dates</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Unlike traditional property sales, we can work around your schedule. Need to complete within weeks or prefer a few months? We can accommodate your timeline.
                </p>
              </motion.div>
              
              {/* Property Consultations */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Property Consultations</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Our team offers free, no-obligation property consultations to understand your unique situation and provide tailored solutions to meet your specific needs.
                </p>
              </motion.div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center mt-16">
              <motion.button
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleModal}
                className="primary-btn"
              >
                Get Your Free Cash Offer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2 
                variants={fadeIn} 
                className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-4"
              >
                Our Simple <span className="italic text-primary-600">Process</span>
            </motion.h2>
              <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
              <motion.p 
                variants={fadeIn}
                className="text-lg text-neutral-700 max-w-3xl mx-auto"
              >
                Selling your property with us is straightforward and stress-free. Just follow these four simple steps.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-3">Initial Consultation</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Contact us to discuss your property and situation. We'll explain our process and answer any questions you have.
                </p>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-3">Property Valuation</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We'll conduct a thorough market analysis and provide you with a fair, no-obligation cash offer within 24 hours.
                </p>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-3">Formal Offer & Legal Process</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Once you accept our offer, we handle all the legal paperwork and coordinate with solicitors to ensure a smooth transaction.
                </p>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-2xl font-semibold mb-3">Completion & Payment</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We complete the purchase on your preferred date, and you receive the funds directly to your account.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Specialised Solutions */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2 
                variants={fadeIn} 
                className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-4"
              >
                For <span className="italic text-primary-600">Buyers & Investors</span>
            </motion.h2>
              <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
              <motion.p 
                variants={fadeIn}
                className="text-lg text-neutral-700 max-w-3xl mx-auto"
              >
                Through our trusted network of finance specialists, we can introduce you to a range of tailored property financing solutions.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bridging Finance */}
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex flex-col items-center text-center md:items-start md:text-left mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Bridging Finance</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-6 flex-grow text-center md:text-left">
                  Need short-term funding to secure a property quickly or bridge a gap between sale and purchase? Through our trusted network, we can connect you with specialists offering competitive rates and quick decisions.
                </p>
                <button className="mx-auto md:ml-0 bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center transition-colors rounded-full px-6 py-3 shadow" onClick={toggleModal}>
                  Enquire about bridging finance
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
              
              {/* Buy-to-Let Mortgages */}
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex flex-col items-center text-center md:items-start md:text-left mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Buy-to-Let Mortgages</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-6 flex-grow text-center md:text-left">
                  Looking to expand your property portfolio? We can introduce you to brokers specialising in buy-to-let mortgages, including solutions for first-time landlords and complex scenarios.
                  </p>
                <button className="mx-auto md:ml-0 bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center transition-colors rounded-full px-6 py-3 shadow" onClick={toggleModal}>
                  Enquire about buy-to-let mortgages
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  </button>
              </motion.div>
              
              {/* Commercial Mortgages */}
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex flex-col items-center text-center md:items-start md:text-left mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Commercial Mortgages</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-6 flex-grow text-center md:text-left">
                  From retail units and offices to industrial properties and holiday lets, we can connect you with specialists who understand commercial property finance.
                  </p>
                <button className="mx-auto md:ml-0 bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center transition-colors rounded-full px-6 py-3 shadow" onClick={toggleModal}>
                    Enquire about commercial mortgages
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  </button>
              </motion.div>
              
              {/* Development Finance */}
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex flex-col items-center text-center md:items-start md:text-left mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 3h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Development Finance</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-6 flex-grow text-center md:text-left">
                  Funding for property development projects large and small, from light refurbishments to ground-up builds. Our trusted partners can help secure up to 90% loan-to-cost.
                  </p>
                <button className="mx-auto md:ml-0 bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center transition-colors rounded-full px-6 py-3 shadow" onClick={toggleModal}>
                  Enquire about development finance
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  </button>
              </motion.div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center mt-16">
            <motion.button 
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                onClick={toggleModal}
                className="primary-btn"
              >
                Speak to a Specialist
            </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ServicesPage
