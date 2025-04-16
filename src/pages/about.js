import React from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/seo'

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

const AboutPage = () => {
  return (
    <>
      <Seo title="About Us - Puretime Property Purchasing" />
      
      {/* Hero Section */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-display font-semibold text-neutral-900 mb-6">
              About Puretime Property
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-neutral-700 mb-8">
              We make selling your home quick, easy, and stress-free.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-8">
              Our Story
            </motion.h2>
            <motion.div variants={fadeIn} className="prose prose-lg max-w-none">
              <p>
                Puretime Property Purchasing was founded with a simple mission: to offer homeowners a faster, more convenient alternative to traditional property sales. We understand that life circumstances can change rapidly, and sometimes waiting months for a property to sell through conventional channels isn't viable.
              </p>
              <p>
                Our team combines decades of experience in the UK property market with a genuine desire to help homeowners in need of quick, hassle-free property sales. Whether you're facing financial constraints, relocating for work, dealing with inheritance issues, or simply want to avoid the stress of traditional selling processes, we're here to help.
              </p>
              <p>
                What sets us apart is our commitment to transparency and fair dealing. We believe in making clear, competitive offers without hidden fees or last-minute price reductions. Our process is designed to give you certainty and peace of mind from the very beginning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-12 text-center">
              Our Values
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-neutral-600">We believe in honest, transparent communication and fair dealing at every stage of the process.</p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                    <path fillRule="evenodd" d="M12.395 7.123a1 1 0 10-1.414-1.414l-3.21 3.21-1.353-1.353a1 1 0 00-1.414 1.414l2.06 2.06a1 1 0 001.415 0l3.915-3.916z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
                <p className="text-neutral-600">We value your time and work diligently to make the sales process as quick and seamless as possible.</p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-neutral-600">We understand that selling your home can be emotional. We approach every client with empathy and respect.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Team section could be added here */}
      
      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6">
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-neutral-700 mb-8">
              Contact us today for a no-obligation property valuation and offer.
            </motion.p>
            <motion.button 
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors"
              onClick={() => {
                // This assumes you have a way to open the contact modal from other components
                if (window !== undefined && window.openContactModal) {
                  window.openContactModal();
                }
              }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
