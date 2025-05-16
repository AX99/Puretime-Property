import React from 'react'
import { motion } from 'framer-motion'
import { FORM_TYPES } from '../context/modalContext'
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
      staggerChildren: 0.1
    }
  }
}

const ProblemProperties = () => {
  
  // Reworded and reordered list of problem properties
  const propertyCategories = [
    {
      title: "Structural Challenges",
      items: [
        "Foundation Issues",
        "Fire-Damaged Properties",
        "Water-Damaged Homes",
        "Subsidence Problems",
        "Partial Renovations"
      ]
    },
    {
      title: "Legal Complications",
      items: [
        "Properties in Probate",
        "Short-Lease Properties",
        "Absentee Freeholder Issues",
        "Regulated Tenancies",
        "Life Tenancies"
      ]
    },
    {
      title: "Special Circumstances",
      items: [
        "Unmortgageable Properties",
        "Homes Facing Repossession",
        "HMO Properties",
        "Neglected Buildings",
        "Reversionary Ground Rent Investments"
      ]
    },
    {
      title: "Maintenance Issues",
      items: [
        "Severe Damp Problems",
        "Electrical System Failures",
        "Pest Infestations",
        "Abandoned Projects",
        "Properties Under Enforcement"
      ]
    }
  ]

  return (
    <section className="py-16 md:py-24 relative bg-gradient-to-br from-white to-neutral-100">
      {/* Background subtlety */}
      <div className="absolute inset-0 z-0 opacity-5 bg-repeat" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>
      
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
              We Buy All Types of <span className="italic text-primary-600">Problem</span> Properties
            </motion.h2>
            <motion.div variants={fadeIn} className="w-20 h-1 bg-primary-600 mx-auto mb-6"></motion.div>
            <motion.p 
              variants={fadeIn}
              className="text-lg text-neutral-700 max-w-3xl mx-auto"
            >
              When traditional estate agents say "we can't help," we say "yes, we can." No matter what issues your property may have, we're interested in buying it quickly and with minimal hassle.
            </motion.p>
          </div>
          
          {/* Categories Grid */}
          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {propertyCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-primary-600"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Section */}
          <CTABanner 
            heading="Have a property others won't touch?"
            description="No matter what condition your property is in or what complications you're facing, we're interested in making you a fair cash offer. Our experienced team specializes in solving complex property situations."
            buttonText="Get a Cash Offer Today"
            className="mt-16"
            formType={FORM_TYPES.PROPERTY_SELLER}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemProperties 