import React from 'react'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import { useModal } from '../context/modalContext'
import { FORM_TYPES } from '../context/modalContext'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ValueCard from '../components/ValueCard'
import ImageGallery from '../components/ImageGallery'

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

// Value card icons
const IntegrityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const EfficiencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const CompassionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const AboutPage = ({ data }) => {
  const { toggleModal } = useModal();
  
  // Handlers for different form types
  const handleSellerForm = () => {
    toggleModal({ type: FORM_TYPES.PROPERTY_SELLER });
  };
  
  const handleBrokerForm = () => {
    toggleModal({ type: FORM_TYPES.BROKER_REFERRAL });
  };
  
  // Process the images from GraphQL query
  const heroImage = getImage(data.heroImage);
  
  // Gallery images for the about section
  const galleryImages = [
    {
      imageData: getImage(data.chairImage),
      alt: "Modern interior with sofa and coffee table"
    },
    {
      imageData: getImage(data.timeImage),
      alt: "Vintage clock and decor items on wooden surface"
    }
  ];
  
  return (
    <>
      <Seo title="About Us - Puretime Property Purchasing" />
      
      {/* Hero Section */}
      <PageHero 
        title="We are <span class='italic text-primary-600'>Puretime</span> Property"
        subtitle="We make selling your home quick, easy, and stress-free."
        eyebrowText="ABOUT US"
        heroImage={heroImage}
      />
      
      {/* Main About Section with Images */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-neutral-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content Column */}
              <motion.div variants={fadeIn} className="order-2 md:order-1">
                <h2 className="section-title mb-8">
                  It's <span className="italic text-primary-600">Time</span> To Sell Differently
                </h2>
                
                <div className="space-y-6">
                  <p className="text-body-lg text-neutral-700 leading-relaxed">
                    We specialise in fast and efficient property sales, regardless of condition or location. Our approach is different - we offer fair cash prices without the hassle of viewings, repairs or lengthy chains.
                  </p>
                  
                  <p className="text-body-lg text-neutral-700 leading-relaxed">
                    Our team is dedicated to providing a hassle-free and transparent service, ensuring a smooth and stress-free experience for our clients. We handle all the paperwork and can work around your preferred timeline.
                  </p>
                  
                  <p className="text-body-lg text-neutral-700 leading-relaxed">
                    We pride ourselves on our commitment to integrity, transparency, and customer satisfaction. When you choose Puretime Property Purchasing, you can trust that you're in good hands.
                  </p>
                </div>
                
                <div className="mt-10 flex justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={handleSellerForm}
                    className="primary-btn"
                  >
                    Get Your Free Valuation
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Right Images Column with Animated Reveal */}
              <div className="order-1 md:order-2 flex items-center justify-end h-full">
                <ImageGallery 
                  images={galleryImages} 
                  layout="overlapping" 
                  className="mb-10 md:mb-0 -mt-6 md:-mt-10 lg:-mt-12 md:pr-4"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader 
              title="Our <span class='italic text-primary-600'>Story</span>"
            />
            
            <motion.div variants={fadeIn} className="space-y-6">
              <p className="text-body-lg text-neutral-700 leading-relaxed">
                Puretime Property Purchasing was founded with a simple mission: to offer homeowners a faster, more convenient alternative to traditional property sales. We understand that life circumstances can change rapidly, and sometimes waiting months for a property to sell through conventional channels isn't viable.
              </p>
              <p className="text-body-lg text-neutral-700 leading-relaxed">
                Our team combines decades of experience in the UK property market with a genuine desire to help homeowners in need of quick, hassle-free property sales. Whether you're facing financial constraints, relocating for work, dealing with inheritance issues, or simply want to avoid the stress of traditional selling processes, we're here to help.
              </p>
              <p className="text-body-lg text-neutral-700 leading-relaxed">
                What sets us apart is our commitment to transparency and fair dealing. We believe in making clear, competitive offers without hidden fees or last-minute price reductions. Our process is designed to give you certainty and peace of mind from the very beginning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-16 md:py-24 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-5 bg-repeat" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <SectionHeader
              title="Our <span class='italic text-primary-600'>Values</span>"
              description="Our core values guide everything we do and ensure we deliver the best possible service to our clients."
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard 
                icon={<IntegrityIcon />}
                title="Integrity"
                description="We believe in honest, transparent communication and fair dealing at every stage of the process. You'll always know exactly where you stand."
              />
              
              <ValueCard 
                icon={<EfficiencyIcon />}
                title="Efficiency"
                description="We value your time and work diligently to make the sales process as quick and seamless as possible, with completion in as little as 30 days."
              />
              
              <ValueCard 
                icon={<CompassionIcon />}
                title="Compassion"
                description="We understand that selling your home can be emotional. We approach every client with empathy, respect, and a genuine desire to help."
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
              Need financing for your next property <span className="italic">investment</span>?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/90 mb-8">
              We can introduce you to specialist brokers for all types of property finance, from bridging loans to buy-to-let mortgages.
            </motion.p>
            <motion.button 
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrokerForm}
              className="secondary-btn"
            >
              Speak to a Specialist
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default AboutPage

// Page query to get images
export const query = graphql`
  query {
    heroImage: file(relativePath: { eq: "assets/livingroom.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90)
      }
    }
    chairImage: file(relativePath: { eq: "assets/chair.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 600, height: 600, quality: 90)
      }
    }
    timeImage: file(relativePath: { eq: "assets/time.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 600, height: 600, quality: 90)
      }
    }
  }
`
