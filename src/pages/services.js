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
            /* 
              You can adjust the objectPosition value to control which part of the image is visible:
              - "center top" shows the top center of the image
              - "center 30%" shows 30% from the top (useful for faces/key elements)
              - "left bottom" shows the bottom left corner
              - "50% 70%" numerically positions from left and top
            */
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
              Fast, flexible property purchasing solutions for every situation
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Services */}
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
              How We Can Help
            </motion.h2>
            
            <div className="space-y-12">
              <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-3">Quick Property Purchases</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Our core service is purchasing properties quickly for cash. We can complete transactions in as little as 7 days, compared to the average 3-6 months with traditional sales. This service is ideal for those who need to sell quickly due to relocation, financial concerns, or other time-sensitive situations.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 md:order-2 flex justify-center">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3 md:order-1">
                  <h3 className="text-2xl font-semibold mb-3">Flexible Completion Dates</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Unlike traditional property sales, we can work around your schedule. Need to complete within weeks or prefer a few months? We can accommodate your timeline, giving you the flexibility to plan your move or next steps without added pressure.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-3">Property Consultations</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Our team offers free, no-obligation property consultations to understand your unique situation and provide tailored solutions. We can help you weigh your options between a quick cash sale and traditional methods, providing honest advice on what's best for your circumstances.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Specialized Services */}
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
              Specialized Solutions
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Inherited Properties</h3>
                <p className="text-neutral-600 mb-4">
                  Dealing with inherited property can be emotionally challenging. We offer sensitive, efficient solutions for selling inherited properties, helping to manage the financial and logistical aspects during a difficult time.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Properties in Disrepair</h3>
                <p className="text-neutral-600 mb-4">
                  Traditional buyers often shy away from properties needing significant work. We purchase properties in any condition, saving you the cost and hassle of renovations or repairs before selling.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Chain Break Solutions</h3>
                <p className="text-neutral-600 mb-4">
                  If you're caught in a property chain that's at risk of collapsing, we can step in as cash buyers to keep your onward purchase on track, preventing delays and potential financial losses.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Relocation Assistance</h3>
                <p className="text-neutral-600 mb-4">
                  When job relocation demands a quick move, our expedited purchase process ensures you can focus on your new position without the stress of a prolonged property sale hanging over you.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Process */}
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
              Our Process
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-2">Initial Consultation</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Contact us to discuss your property and situation. We'll explain our process and answer any questions you have.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-2">Property Valuation</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We'll conduct a thorough market analysis and provide you with a fair, no-obligation cash offer within 24 hours.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-2">Formal Offer & Legal Process</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Once you accept our offer, we handle all the legal paperwork and coordinate with solicitors to ensure a smooth transaction.
                </p>
              </motion.div>
              
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
