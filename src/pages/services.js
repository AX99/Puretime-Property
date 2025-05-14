import React from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'

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
  return (
    <>
      <Seo title="Our Services - Puretime Property Purchasing" />
      
      {/* Hero Section */}
      <section className="bg-neutral-50 py-16 md:py-24 relative">
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
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-display font-semibold text-neutral-900 mb-6">
              Our Services
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-neutral-700 mb-8">
              Fast, flexible property solutions for every situation. Whether you're looking to sell your home quickly or need help securing lending for your next purchase, our team and trusted partners are here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Process (moved up) */}
      <section className="py-16 md:py-24 relative">
        {/* Add a subtle background pattern */}
        <div className="absolute inset-0 bg-neutral-50 opacity-50 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-12 text-center">
              Sell your property in 4 simple steps
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-2">Initial Consultation</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Contact us to discuss your property and situation. We'll explain our process and answer any questions you have.
                </p>
              </motion.div>
              {/* Step 2 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-2">Property Valuation</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We'll conduct a thorough market analysis and provide you with a fair, no-obligation cash offer within 24 hours.
                </p>
              </motion.div>
              {/* Step 3 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-2">Formal Offer & Legal Process</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Once you accept our offer, we handle all the legal paperwork and coordinate with solicitors to ensure a smooth transaction.
                </p>
              </motion.div>
              {/* Step 4 */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-2xl font-semibold mb-2">Completion & Payment</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We complete the purchase on your preferred date, and you receive the funds directly to your account.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Seller Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-12 text-center">
              For Homeowners
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Quick Property Purchases */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                <h3 className="text-xl font-semibold mb-3">Quick Property Purchases</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Our core service is purchasing properties quickly for cash. We can complete transactions in as little as 7 days, compared to the average 3-6 months with traditional sales. This service is ideal for those who need to sell quickly due to relocation, financial concerns, or other time-sensitive situations.
                  </p>
              </motion.div>
              {/* Flexible Completion Dates */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Completion Dates</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Unlike traditional property sales, we can work around your schedule. Need to complete within weeks or prefer a few months? We can accommodate your timeline, giving you the flexibility to plan your move or next steps without added pressure.
                  </p>
              </motion.div>
              {/* Property Consultations */}
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Property Consultations</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Our team offers free, no-obligation property consultations to understand your unique situation and provide tailored solutions. We can help you weigh your options between a quick cash sale and traditional methods, providing honest advice on what's best for your circumstances.
                  </p>
              </motion.div>
            </div>
            {/* Section-level CTA for homeowners */}
            <div className="flex justify-center mt-12">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition" onClick={() => { if (window !== undefined && window.openContactModal) { window.openContactModal(); } }}>
                Get your free cash offer
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Specialised Solutions */}
      <section className="bg-neutral-50 py-16 md:py-24 relative">
        {/* Add decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <StaticImage 
            src="../images/pattern.png" 
            alt="Decorative pattern" 
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-12 text-center">
              Buyers & Investors - Specialised Solutions
            </motion.h2>
            <div className="space-y-12">
              {/* Bridging Loans */}
              <motion.div variants={fadeIn} className="relative flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-white via-neutral-50 to-neutral-100 p-8 rounded-2xl shadow-xl border-l-8 border-primary-600 hover:scale-[1.025] hover:shadow-2xl transition-all duration-300">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1m4 4h-1v-4h-1" /></svg>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900">Bridging Loans</h3>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    The best opportunities don't wait around, so why should you? Through our trusted network of finance specialists, we can introduce you to short-term bridging loan providers who help you move quickly – whether you're securing your dream home, bridging the gap between purchase and sale, or moving fast on an investment. Our contacts can assist with auction purchases, development exits, refurbishment finance, unmortgageable properties, and capital raising for any legal purpose.
                  </p>
                  <button className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-semibold shadow transition" onClick={() => { if (window !== undefined && window.openContactModal) { window.openContactModal(); } }}>
                    Enquire about bridging loans
                  </button>
                </div>
              </motion.div>
              {/* Development Finance */}
              <motion.div variants={fadeIn} className="relative flex flex-col md:flex-row-reverse gap-8 items-center bg-gradient-to-br from-white via-neutral-50 to-neutral-100 p-8 rounded-2xl shadow-xl border-l-8 border-primary-600 hover:scale-[1.025] hover:shadow-2xl transition-all duration-300">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900">Development Finance</h3>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    Development finance can be complex, but our network of experienced brokers and lenders can help you find the right solution. We can introduce you to specialists who can assist with funding at pre-planning stage, unlocking equity from completed developments, stretching senior products up to 90% Loan-to-Cost, and covering refurbishments, conversions, or ground-up projects. Our contacts can also facilitate meetings with lenders to keep your project moving.
                  </p>
                  <button className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-semibold shadow transition" onClick={() => { if (window !== undefined && window.openContactModal) { window.openContactModal(); } }}>
                    Enquire about development finance
                  </button>
                </div>
              </motion.div>
              {/* Commercial Mortgages */}
              <motion.div variants={fadeIn} className="relative flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-white via-neutral-50 to-neutral-100 p-8 rounded-2xl shadow-xl border-l-8 border-primary-600 hover:scale-[1.025] hover:shadow-2xl transition-all duration-300">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M9 21V7a2 2 0 012-2h2a2 2 0 012 2v14" /></svg>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900">Commercial Mortgages</h3>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    Whether you're reinvesting in your business or financing something new, we can connect you with commercial mortgage specialists from our network. They can help you unlock the value in your property, with options for a wide range of property types – from offices and holiday lets to industrial or retail units and more. Applications can be made in personal names, limited companies, LLPs, and SIPPs. Investment properties on short leases are considered, with rates linked to the bank base rate, LIBOR, or fixed in some cases.
                  </p>
                  <button className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-semibold shadow transition" onClick={() => { if (window !== undefined && window.openContactModal) { window.openContactModal(); } }}>
                    Enquire about commercial mortgages
                  </button>
                </div>
              </motion.div>
              {/* Buy-to-Let */}
              <motion.div variants={fadeIn} className="relative flex flex-col md:flex-row-reverse gap-8 items-center bg-gradient-to-br from-white via-neutral-50 to-neutral-100 p-8 rounded-2xl shadow-xl border-l-8 border-primary-600 hover:scale-[1.025] hover:shadow-2xl transition-all duration-300">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" /></svg>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900">Buy-to-Let</h3>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    Looking for a buy-to-let mortgage? We can introduce you to experienced brokers in our network who offer a range of finance options from leading lenders. Whether you're a first-time landlord or an experienced investor, our contacts can help with complex scenarios including flats above commercial premises, portfolio incorporations, limited company applications, HMOs, MUFBs, first-time landlords, and expat or foreign national landlords.
                  </p>
                  <button className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-semibold shadow transition" onClick={() => { if (window !== undefined && window.openContactModal) { window.openContactModal(); } }}>
                    Enquire about buy-to-let
                  </button>
                </div>
              </motion.div>
            </div>
            {/* Section-level CTA for buyers & investors */}
            <div className="flex justify-center mt-12">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition" onClick={() => { if (window !== undefined && window.openContactModal) { window.openContactModal(); } }}>
                Get introduced to a trusted broker
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
              Ready for a hassle-free property sale?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/90 mb-8">
              Get your free, no-obligation cash offer today. No fees, no pressure – just honest property solutions.
            </motion.p>
            <motion.button 
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
              onClick={() => {
                // This assumes you have a way to open the contact modal from other components
                if (window !== undefined && window.openContactModal) {
                  window.openContactModal();
                }
              }}
            >
              Get Your Free Offer
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ServicesPage
