import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { easeOut, motion } from 'framer-motion'
import CtaButton from '../images/cta-button.svg'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [easeOut],
    },
  },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
    overlay.style.transition = 'background-color 0.2s'
    document.body.appendChild(overlay)

    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    })

    // Increase z-index of the element with fade-in effect
    const originalZIndex = element.style.zIndex || 'auto'
    element.style.transition = 'z-index 0.2s'
    element.style.zIndex = '100000'

    // Focus on the input inside the element
    const inputElement = element.querySelector('input')
    if (inputElement) {
      inputElement.focus()
    }

    // Revert changes with fade-out effect after 3 seconds
    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      element.style.zIndex = originalZIndex
      setTimeout(() => {
        document.body.removeChild(overlay)
      }, 1000)
    }, 2000)
  }

  const handleScrollToInput = () => {
    // Get the element we want to scroll to
    const element = document.getElementById('banner_input')
    
    if (element) {
      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect()
      
      // Calculate the absolute position by adding current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const absoluteElementTop = rect.top + scrollTop
      
      // Calculate the center position (element top - half of viewport height + half of element height)
      const center = absoluteElementTop - (window.innerHeight / 2) + (rect.height / 2)
      
      // Perform smooth scroll
      window.scrollTo({
        top: center,
        behavior: 'smooth'
      })
      
      // Set a timeout to highlight the input after scrolling has started
      setTimeout(() => {
        highlightElement('div_input')
      }, 300) // Delay to let scroll animation start
    }
  }

  const nodes = data.allHeroJson.nodes
  const subheadingArray = nodes[0].subheading.split(' ')
  const spanWords = subheadingArray.slice(0, 3).join(' ')
  const backgroundImage = getImage(data.heroimage)
  
  return (
    <div className="relative h-screen">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-10"></div>
      
      {/* Background image */}
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage.images.fallback.src})`,
        }}
      ></div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            {nodes.map((node, i) => (
              <div key={i} className="space-y-6 md:space-y-8">
                <motion.h1 
                  variants={fadeInUp}
                  className="font-display text-display-lg md:text-display-xl lg:text-display-2xl font-bold text-white leading-tight drop-shadow-xl"
                >
                  {node.header}{' '}
                  <span className="text-primary-600 drop-shadow-xl">{node.span}</span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-body-lg md:text-body-xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-xl"
                >
                  <span className="font-bold text-primary-600 drop-shadow-xl">
                    {spanWords}
                  </span>{' '}
                  {subheadingArray.slice(3).join(' ')}
                </motion.p>
                
                <motion.div
                  variants={fadeInUp}
                  className="pt-6 md:pt-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={handleScrollToInput}
                    className="inline-block"
                  >
                    <img
                      src={CtaButton}
                      alt="Get an offer"
                      className="cursor-pointer mx-auto w-auto h-auto max-w-full sm:max-w-[85%] md:max-w-full hover:filter hover:brightness-110 transition-all duration-300"
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
