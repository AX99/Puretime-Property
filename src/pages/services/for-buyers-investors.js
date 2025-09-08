import React from 'react'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Seo from '../../components/seo'
import HeroVariant from '../../components/HeroVariant'
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

const ForBuyersInvestorsPage = ({ data }) => {
  const heroImage = getImage(data?.buyersInvestorsBg);

  // Hero stats data
  const heroStats = [
    { value: "£2.4M", label: "Weekly Lending" },
    { value: "48hrs", label: "Decision Time" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Broker Access" }
  ];

  // Simple service explanations - removed complex technical details
  const services = [
    {
      title: "Bridging Finance",
      description: "Quick funding solutions for property purchases when you need to move fast or bridge financing gaps.",
      whatItsFor: "Ideal for auction purchases, chain breaks, or when you need to secure a property quickly before arranging long-term finance.",
      benefits: [
        "Fast approval process",
        "Flexible terms available",
        "No early repayment penalties",
        "Expert broker support"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>`
    },
    {
      title: "Buy-to-Let Mortgages",
      description: "Specialist mortgage solutions designed specifically for property investors and landlords.",
      whatItsFor: "Perfect for building a property portfolio, refinancing existing rentals, or purchasing your first investment property.",
      benefits: [
        "Competitive rates",
        "Portfolio landlord options",
        "Professional landlord deals",
        "Remortgage opportunities"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>`
    },
    {
      title: "Commercial Finance",
      description: "Funding solutions for commercial property investments and business expansion opportunities.",
      whatItsFor: "Suitable for purchasing commercial premises, refinancing business properties, or investing in commercial developments.",
      benefits: [
        "Business expansion support",
        "Investment opportunities",
        "Flexible commercial terms",
        "Expert commercial brokers"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>`
    },
    {
      title: "Development Finance",
      description: "Specialist funding for property development projects from small refurbishments to large-scale developments.",
      whatItsFor: "Essential for property developers, renovation projects, conversions, and new build developments.",
      benefits: [
        "Project-specific solutions",
        "Staged payment releases",
        "Development expertise",
        "Risk assessment support"
      ],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
      </svg>`
    }
  ];

  // Referral process steps
  const referralProcess = [
    {
      step: "1",
      title: "Initial Consultation", 
      description: "Tell us about your property goals and financing needs"
    },
    {
      step: "2", 
      title: "Expert Matching",
      description: "We connect you with the most suitable broker from our network"
    },
    {
      step: "3",
      title: "Tailored Solutions",
      description: "Your broker presents financing options designed for your situation"
    },
    {
      step: "4",
      title: "Ongoing Support", 
      description: "Full support through the application and completion process"
    }
  ];

  // Success testimonials - clean and professional
  const testimonials = [
    {
      name: "James Mitchell",
      role: "Property Investor",
      location: "Essex",
      quote: "The bridging finance arranged through Puretime helped me secure a fantastic auction purchase. Professional service from start to finish.",
      rating: 5
    },
    {
      name: "Sarah Chen", 
      role: "Portfolio Landlord",
      location: "London",
      quote: "Excellent buy-to-let mortgage advice. My broker found rates I couldn't access directly and guided me through the whole process.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Property Developer", 
      location: "Kent",
      quote: "The development finance package was perfectly structured for our project. Great communication and expertise throughout.",
      rating: 5
    }
  ];

  return (
    <>
      <Seo title="For Buyers & Investors - Property Finance Solutions | Puretime Property" />
      
      {/* Hero Section */}
      <HeroVariant
        variant="business"
        eyebrowText="FOR BUYERS & INVESTORS"
        titleJSX={<>Access <span className="italic text-primary-700">Professional</span> Finance Solutions</>}
        subtitle="Connect with our network of specialist brokers for competitive rates and expert guidance on all types of property finance."
        ctaText="Speak to Finance Expert"
        formType={FORM_TYPES.BROKER_REFERRAL}
        showStats={false}
        stats={heroStats}
        heroImage={heroImage}
      />

      {/* Why Our Broker Network Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-center text-display-md font-display font-semibold text-neutral-900 mb-4">
              Why Our <span className="italic text-primary-700">Broker Network</span>?
            </motion.h2>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-700 mx-auto mb-16"></motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Vetted Specialists</h3>
                <p className="text-neutral-700">All our brokers are carefully selected, fully qualified, and specialise in property finance.</p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Competitive Rates</h3>
                <p className="text-neutral-700">Access to exclusive deals and rates that aren't available on the high street or online.</p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Full Support</h3>
                <p className="text-neutral-700">Personal service from initial consultation through to completion and beyond.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Service Explanations */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-center text-display-md font-display font-semibold text-neutral-900 mb-4">
              <span className="italic text-primary-700">Finance</span> Solutions Available
            </motion.h2>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-700 mx-auto mb-16"></motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="w-6 h-6 text-primary-700" dangerouslySetInnerHTML={{ __html: service.icon }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                      <p className="text-neutral-700 mb-4">{service.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-900 mb-2">What it's for:</h4>
                    <p className="text-neutral-700 text-body-sm">{service.whatItsFor}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-900 mb-3">Key benefits:</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-body-sm text-neutral-700">
                          <svg className="w-4 h-4 text-primary-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referral Process */}
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
              Our <span className="italic text-primary-700">Referral</span> Process
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {referralProcess.map((item, index) => (
                <motion.div key={index} variants={fadeIn} className="text-center">
                  <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-neutral-700 text-body-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Testimonials */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="text-center text-display-md font-display font-semibold text-neutral-900 mb-16">
              Successful <span className="italic text-primary-700">Referrals</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-body-sm text-neutral-600">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABanner
        headingJSX={<>Ready to Access <span className="italic">Professional</span> Finance?</>}
        description="Connect with our specialist broker network for competitive rates and expert guidance tailored to your property investment goals."
        buttonText="Speak to Finance Expert"
        variant="business"
        icon="chart-up"
        formType={FORM_TYPES.BROKER_REFERRAL}
      />
    </>
  )
}

export default ForBuyersInvestorsPage

export const query = graphql`
  query ForBuyersInvestorsHeroImageQuery {
    buyersInvestorsBg: file(relativePath: { eq: "assets/keys.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90)
      }
    }
  }
`