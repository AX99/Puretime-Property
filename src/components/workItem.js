import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'

const WorkItem = ({ image, title, description, animate = false, ...props }) => {
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  }
  
  const Component = animate ? motion.div : 'div'
  
  return (
    <Component 
      className={`flex basis-1/2 flex-col ${props.className}`}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? { once: true, amount: 0.3 } : undefined}
    >
      <motion.div
        variants={animate ? imageVariants : undefined}
        whileHover={animate ? { scale: 1.02 } : undefined}
        transition={animate ? { duration: 0.3 } : undefined}
      >
        <GatsbyImage 
          image={image} 
          alt={title} 
          className="rounded-xl shadow-xl" 
        />
      </motion.div>
      
      <motion.div 
        className="flex flex-col self-stretch pt-6"
        variants={animate ? textVariants : undefined}
      >
        <h3 className="font-display text-display-md pb-4">{title}</h3>
        <p className="text-body-lg font-light text-neutral-700">
          {description}
        </p>
      </motion.div>
    </Component>
  )
}

WorkItem.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool
}

export default WorkItem
