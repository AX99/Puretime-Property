import React from 'react'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Seo from '../../components/seo'
import HeroVariant from '../../components/HeroVariant'
import ServiceTimeline from '../../components/ServiceTimeline'
import CTABanner from '../../components/CTABanner'
import { FORM_TYPES } from '../../context/modalContext'

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

const ForHomeownersPage = ({ data }) => {
  const heroImage = getImage(data?.homeownersBg);

  // Service data for timeline
  const services = [
    {
      title: "Initial Consultation",
      description: "Contact us to discuss your property and situation. We'll explain our process and answer any questions you have about selling quickly.",
      features: [
        "Free property assessment",
        "No obligation consultation", 
        "Same-day response",
        "Confidential discussion"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>`,
      ctaText: "Start Your Consultation",
      formType: FORM_TYPES.PROPERTY_SELLER
    },
    {
      title: "Property Valuation", 
      description: "We'll conduct a thorough market analysis and provide you with a fair, no-obligation cash offer within 24 hours.",
      features: [
        "Professional market analysis",
        "Fair cash offer within 24 hours",
        "No estate agent fees",
        "No viewings required"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
      </svg>`,
      ctaText: "Get Your Valuation",
      formType: FORM_TYPES.PROPERTY_SELLER
    },
    {
      title: "Legal Process",
      description: "Once you accept our offer, we handle all the legal paperwork and coordinate with solicitors to ensure a smooth transaction.",
      features: [
        "Full legal support included",
        "Experienced solicitor network",
        "Regular progress updates",
        "Transparent process"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
      </svg>`,
      ctaText: "Learn About Process",
      formType: FORM_TYPES.PROPERTY_SELLER
    },
    {
      title: "Completion & Payment",
      description: "We complete the purchase on your preferred date, and you receive the funds directly to your account - no delays, no chains.",
      features: [
        "Complete in 30 days or less",
        "Your preferred completion date",
        "Immediate fund transfer",
        "No chain complications"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>`,
      ctaText: "Complete Your Sale",
      formType: FORM_TYPES.PROPERTY_SELLER
    }
  ];

  // Trust indicators data
  const trustIndicators = [
    { metric: "30 Days", label: "Average Completion" },
    { metric: "98%", label: "Client Satisfaction" },
    { metric: "£2.8M", label: "Purchased This Month" },
    { metric: "500+", label: "Happy Homeowners" }
  ];

  return (
    <>
      <Seo title="For Homeowners - Fast Property Sales | Puretime Property" />
      
      {/* Hero Section */}
      <HeroVariant
        variant="supportive"
        eyebrowText="FOR HOMEOWNERS"
        titleJSX={<>Sell Your Home <span className="italic text-primary-600">Fast</span></>}
        subtitle="Skip the stress of traditional selling. Get a fair cash offer within 24 hours and complete in as little as 30 days."
        ctaText="Get My Cash Offer Now"
        formType={FORM_TYPES.PROPERTY_SELLER}
        heroImage={heroImage}
        imageObjectPosition="center 80%"
      />

      {/* Value Proposition Bar */}
      <section className="py-8 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-2">Traditional Estate Agents</h3>
                <ul className="space-y-1 text-white/80">
                  <li>• 3-6 months average sale time</li>
                  <li>• Multiple viewings required</li>
                  <li>• 2-3% estate agent fees</li>
                  <li>• Risk of chain collapse</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-2">Puretime Property</h3>
                <ul className="space-y-1 text-white font-medium">
                  <li>• Complete in as little as 30 days</li>
                  <li>• No viewings or disruption</li>
                  <li>• No fees or hidden costs</li>
                  <li>• No chain - guaranteed purchase</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-2xl font-bold text-neutral-900 mb-8">
              Trusted by Homeowners Across Essex
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustIndicators.map((indicator, index) => (
                <motion.div key={index} variants={fadeIn} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                    {indicator.metric}
                  </div>
                  <div className="text-body-sm text-neutral-600 uppercase tracking-wide">
                    {indicator.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Timeline */}
      <ServiceTimeline 
        services={services}
        titleJSX={<>Our Simple <span className="italic text-primary-600">4-Step</span> Process</>}
        description="Selling your property with us is straightforward and stress-free. From initial contact to completion in just 4 simple steps."
        formType={FORM_TYPES.PROPERTY_SELLER}
      />

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-center text-display-md font-display font-semibold text-neutral-900 mb-16">
              What Our <span className="italic text-primary-600">Homeowners</span> Say
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-bold">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-body-sm text-neutral-600">Chelmsford</div>
                  </div>
                </div>
                <p className="text-neutral-700 mb-4">
                  "Needed to sell quickly due to job relocation. Puretime Property delivered exactly as promised - cash offer in 24 hours, completed in 28 days."
                </p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-bold">MT</span>
                  </div>
                  <div>
                    <div className="font-semibold">Michael Thompson</div>
                    <div className="text-body-sm text-neutral-600">Colchester</div>
                  </div>
                </div>
                <p className="text-neutral-700 mb-4">
                  "After months on the market with estate agents, Puretime Property bought our house in 6 weeks. Professional service throughout."
                </p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-bold">LW</span>
                  </div>
                  <div>
                    <div className="font-semibold">Lisa White</div>
                    <div className="text-body-sm text-neutral-600">Braintree</div>
                  </div>
                </div>
                <p className="text-neutral-700 mb-4">
                  "Fair price, no hassle, and completed when they promised. Would definitely recommend to anyone needing a quick sale."
                </p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold mb-8">
              Our <span className="italic text-white">Guarantee</span> to You
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">30-Day Completion</h3>
                <p className="text-white/90">We guarantee to complete your property purchase within 30 days of acceptance.</p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No Hidden Fees</h3>
                <p className="text-white/90">What we offer is what you get. No deductions, no surprise costs, no fine print.</p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-white/90">Our team is available around the clock to answer questions and provide updates.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact CTA */}
      <CTABanner 
        variant="urgent"
        icon="clock"
        heading="Need to Sell Urgently?"
        description="Facing repossession, divorce, or need immediate funds? We can help. Get in touch today for priority service."
        buttonText="Get Urgent Help Now"
        formType={FORM_TYPES.PROPERTY_SELLER}
        className="my-16"
      />
    </>
  )
}

export default ForHomeownersPage

export const query = graphql`
  query ForHomeownersHeroImageQuery {
    homeownersBg: file(relativePath: { eq: "assets/clock.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90)
      }
    }
  }
`
