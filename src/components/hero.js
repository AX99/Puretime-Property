import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'
import CtaButton from '../images/cta-button.svg'

// Enhanced animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const Hero = () => {
  const data = useStaticQuery(graphql`
    {
      heroimage: file(relativePath: { eq: "hero-image.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 5120
            placeholder: BLURRED
            formats: [WEBP, AVIF]
          )
        }
      }
      allHeroJson {
        nodes {
          header
          span
          subheading
        }
      }
    }
  `)
  
  function highlightElement(elementId) {
    const element = document.getElementById(elementId)

    if (!element) {
      console.error('Element not found')
      return
    }

    // Apply darker overlay
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    overlay.style.zIndex = '9999'
    overlay.style.transition = 'background-color 0.3s ease'
    document.body.appendChild(overlay)

    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
    })

    // Increase z-index of the element with fade-in effect
    const originalZIndex = element.style.zIndex || 'auto'
    element.style.transition = 'all 0.3s ease'
    element.style.zIndex = '100000'
    element.style.transform = 'scale(1.03)'
    element.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'

    // Focus on the input inside the element
    const inputElement = element.querySelector('input')
    if (inputElement) {
      inputElement.focus()
    }

    // Revert changes with fade-out effect after 3 seconds
    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      element.style.zIndex = originalZIndex
      element.style.transform = 'scale(1)'
      element.style.boxShadow = 'none'
      setTimeout(() => {
        document.body.removeChild(overlay)
      }, 500)
    }, 2500)
  }

  const handleScrollToInput = () => {
    // Get the element we want to scroll to
    const element = document.getElementById('steps_header')
    
    if (element) {
      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect()
      
      // Calculate the absolute position by adding current scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const absoluteElementTop = rect.top + scrollTop
      
      // Account for header height (approximately 75-90px) extra padding added
      const headerOffset = 110
      const topPosition = absoluteElementTop - headerOffset
      
      // Perform smooth scroll to position the element at the top
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      })
      
      // Set a timeout to highlight the input after scrolling has started
      setTimeout(() => {
        highlightElement('div_input')
      }, 800) // Longer delay for smoother experience
    }
  }

  const nodes = data.allHeroJson.nodes
  const subheadingArray = nodes[0].subheading.split(' ')
  const spanWords = subheadingArray.slice(0, 3).join(' ')
  const backgroundImage = getImage(data.heroimage)
  
  return (
    <div className="relative h-screen">
      {/* Animated overlay gradient with better depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      ></motion.div>
      
      {/* Background image with subtle zoom effect */}
      <motion.div
        className="h-full w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage.images.fallback.src})`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-start pt-16 md:items-center md:pt-0">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            {nodes.map((node, i) => (
              <div key={i} className="space-y-8 md:space-y-10">
                <motion.h1 
                  variants={fadeInUp}
                  className="font-display text-display-lg md:text-display-xl lg:text-display-2xl font-bold text-white leading-tight drop-shadow-xl"
                >
                  {node.header.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.3 + (index * 0.1),
                        ease: [0.6, 0.05, 0.01, 0.9],
                      }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                  {' '}
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-primary-600 drop-shadow-xl inline-block"
                  >
                    {node.span}
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-body-lg md:text-body-xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-xl"
                >
                  <motion.span 
                    className="font-bold text-primary-600 drop-shadow-xl"
                    whileHover={{ color: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                  >
                    {spanWords}
                  </motion.span>{' '}
                  {subheadingArray.slice(3).join(' ')}
                </motion.p>
                
                <motion.div
                  variants={fadeIn}
                  className="pt-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17
                    }}
                    onClick={handleScrollToInput}
                    className="inline-block relative group"
                  >
                    <img
                      src={CtaButton}
                      alt="Get an offer"
                      className="relative cursor-pointer mx-auto w-auto h-auto max-w-full sm:max-w-[85%] md:max-w-full hover:filter hover:brightness-110 transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
