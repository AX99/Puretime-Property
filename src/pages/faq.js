import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import PageHero from '../components/PageHero'
import { motion, AnimatePresence } from 'framer-motion'
import ContactButton from '../components/ContactButton'
import { FORM_TYPES } from '../context/modalContext'

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
      staggerChildren: 0.1
    }
  }
}

// FAQ item component with toggle functionality
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div 
      variants={fadeIn}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-xl font-semibold text-neutral-900">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="prose prose-lg text-neutral-700">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FaqPage = ({ data }) => {
  const heroImage = getImage(data.faqHero)

  // FAQ data with questions and answers
  const faqItems = [
    {
      question: "How quickly can you buy my property?",
      answer: <p>We can complete the purchase in as little as 30 days from initial contact. However, we can also work to your preferred timeline if you need more time. Our flexible approach means we can accommodate your needs, whether you're looking for a quick sale or need a specific completion date.</p>
    },
    {
      question: "How does the process work?",
      answer: <p>Our process is simple and transparent: First, you contact us with details about your property. We then conduct a quick market analysis and provide you with a free, no-obligation cash offer within 48 hours. If you accept, we handle all the legal paperwork and can complete the purchase with you paying no legal fees and no risk of last-minute fall-throughs.</p>
    },
    {
      question: "Will you buy any property?",
      answer: <p>Yes, we consider properties in any condition and in any location across Mainland UK (Except Scotland and Northern Ireland). Whether your property is in pristine condition or requires significant renovation, we can make you a fair offer. We've bought everything from studio apartments to large family homes, including properties with structural issues, short leases, or non-standard construction types.</p>
    },
    {
      question: "How much will you offer for my property?",
      answer: <p>Our offers are typically between 75-85% of the full market value. While this is below what you might achieve on the open market in ideal conditions, it reflects the significant benefits we provide: guaranteed sale, no fees (we cover all legal costs), no viewings or repairs needed, and the speed and certainty we offer. For many sellers, the savings in time, stress, and carrying costs make our service valuable.</p>
    },
    {
      question: "Are there any fees to pay?",
      answer: <p>No. We cover legal fees associated with the sale of your property. The price we offer is exactly what you'll receive – there are no hidden charges or deductions.</p>
    },
    {
      question: "Is there any obligation when I request an offer?",
      answer: <p>Absolutely not. When you request an offer from us, there's no obligation to proceed. We provide a free valuation and cash offer with no strings attached. You're free to take as much time as you need to consider our offer, and you can walk away at any point if you decide it's not right for you.</p>
    },
    {
      question: "I'm in a property chain that's at risk of breaking down. Can you help?",
      answer: <p>Yes, this is a common situation we assist with. If you're caught in a property chain and your buyer has pulled out or is causing delays, we can step in as cash buyers to keep your onward purchase on track. Our ability to complete quickly means we can often save chains that would otherwise collapse, preventing you from losing your dream home.</p>
    },
    {
      question: "Do I need to prepare or repair my property before selling?",
      answer: <p>No, one of the key benefits of selling to us is that we buy properties in their current condition. There's no need to redecorate, make repairs, or even clean before completion. This saves you time, stress, and potentially thousands in repair costs that might be demanded by traditional buyers.</p>
    }
  ]

  return (
    <>
      <Seo title="FAQ - Puretime Property Purchasing" />
      <PageHero 
        title="Frequently Asked <span class='italic text-primary-600'>Questions</span>"
        subtitle="Everything you need to know about our property purchasing service"
        eyebrowText="FAQ"
        heroImage={heroImage}
      />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 relative bg-gradient-to-br from-white to-neutral-100 overflow-hidden">
        {/* Background pattern for consistency */}
        <div className="absolute inset-0 z-0 opacity-5 bg-repeat" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/ %3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto space-y-8"
          >
            {faqItems.map((item, index) => (
              <FaqItem 
                key={index} 
                question={item.question} 
                answer={item.answer} 
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Additional Question CTA */}
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
              Still have questions?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/90 mb-8">
              Our team is ready to answer any questions you might have about selling your property to us.
            </motion.p>
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactButton
                formType={FORM_TYPES.GENERAL_CONTACT}
                buttonText="Contact Us"
                buttonClass="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default FaqPage

export const query = graphql`
  query {
    faqHero: file(relativePath: { eq: "assets/faq-hero.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90)
      }
    }
  }
`
