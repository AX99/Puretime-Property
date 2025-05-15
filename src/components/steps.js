import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'
import { useModal } from '../context/modalContext'
import CTABanner from './CTABanner'

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

const Steps = () => {
  const data = useStaticQuery(graphql`
    {
      allStepsJson {
        nodes {
          steps {
            id
            title
            description
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 592
                  placeholder: BLURRED
                  formats: [WEBP, AVIF]
                )
              }
            }
          }
          page {
            section
            span
            headline
          }
        }
      }
    }
  `)

  const { toggleModal } = useModal()
  const page = data.allStepsJson.nodes[0].page
  const steps = data.allStepsJson.nodes[0].steps
  
  // CTA texts for each step
  const ctaTexts = [
    "Get Started Now",
    "Request Your Offer",
    "Complete Your Sale"
  ]

  return (
    <section id="steps" className="bg-gradient-to-br from-white to-neutral-100 relative">
      {/* Add subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5 bg-repeat" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header - Improved for better attention */}
          <div className="text-center mb-16">
            <motion.div variants={fadeIn} className="inline-block bg-primary-600/10 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold tracking-wide uppercase text-body-md">
                {page.section}
              </span>
            </motion.div>
            
            <motion.h2 
              variants={fadeIn} 
              className="font-display text-display-lg md:text-display-xl font-semibold text-neutral-900 mb-6 leading-tight"
            >
              <span className="italic text-primary-600">{page.span}</span>{page.headline}
            </motion.h2>
            
            <motion.div variants={fadeIn} className="w-24 h-1 bg-primary-600 mx-auto mb-8"></motion.div>
            
            <motion.p 
              variants={fadeIn} 
              className="text-body-lg md:text-body-xl text-neutral-700 max-w-3xl mx-auto"
            >
              Our streamlined process makes selling your property quick and hassle-free. <br /> Here's how it works:
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Full-Height Steps Section */}
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={`min-h-[60vh] py-10 flex items-center ${index % 2 === 0 ? 'bg-transparent' : 'bg-white/60'} relative z-10`}
          id={`step-${step.id}`}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              className="max-w-6xl mx-auto"
            >
              {/* Card Layout */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
                {/* Step Number Badge - Position based on odd/even index */}
                {index % 2 === 1 ? (
                  // For odd-indexed steps (2, 4, etc.) position the badge on the image side
                  <div className={`absolute top-6 ${index % 2 === 1 ? 'right-6 md:left-[calc(50%+1rem)]' : 'left-6'} z-10 w-16 h-16 bg-primary-600 text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-md`}>
                    {step.id}
                  </div>
                ) : (
                  // For even-indexed steps (1, 3, etc.) keep normal positioning
                  <div className="absolute top-6 left-6 z-10 w-16 h-16 bg-primary-600 text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-md">
                    {step.id}
                  </div>
                )}
                
                <div className="md:flex">
                  {/* Image Section - Right on even steps, left on odd steps */}
                  <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''} relative`}>
                    <GatsbyImage 
                      image={getImage(step.image)} 
                      alt={step.title}
                      className="w-full h-72 md:h-full object-cover" 
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                    {/* Title with increased spacing and size */}
                    <h3 className="font-display underline decoration-primary-600 decoration-4 underline-offset-4 text-display-md md:text-display-lg font-semibold text-neutral-900 mb-6 leading-tight">
                      {step.title}
                    </h3>
                    
                    {/* Description with better typography */}
                    <p className="text-body-lg md:text-body-xl text-neutral-700 mb-10 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Enhanced CTA Button - centered on mobile */}
                    <div className="flex justify-center md:justify-start">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        onClick={toggleModal}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-md"
                      >
                        {ctaTexts[index]}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
      
      {/* Final CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <CTABanner 
          heading="Ready to sell your property?"
          description="Contact us today for a no-obligation cash offer. We can complete the purchase in as little as 30 days."
          buttonText="Get Your Free Cash Offer"
        />
      </div>
    </section>
  )
}

export default Steps
