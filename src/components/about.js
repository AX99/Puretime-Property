import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'

import Eyebrow from './eyebrow'
// import Logo from "../images/logos/logo.svg";

const About = () => {
  const data = useStaticQuery(graphql`
    {
      aboutimage: file(relativePath: { eq: "about-creative.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 592
            placeholder: BLURRED
            formats: [WEBP, AVIF]
          )
        }
      }
      allAboutJson {
        nodes {
          section
          headline
          paragraph1
          paragraph2
          paragraph3
        }
      }
    }
  `)
  const page = data.allAboutJson.nodes[0]
  
  // Enhanced animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    }
  }
  
  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 30
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }
  
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4 + (i * 0.1)
      }
    })
  }
  
  return (
    <div className="bg-neutral-50 py-16 md:py-24">
      <div id="about" className="container mx-auto">
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-20 lg:py-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-6 flex flex-col gap-6 px-4 md:px-0"
          >
            <motion.div variants={textVariants}>
              <Eyebrow label={page.section} />
            </motion.div>
            
            <motion.h2 
              className="font-display md:text-display-xl text-display-md font-normal pb-4"
              variants={textVariants}
            >
              <span className="italic underline underline-offset-2 decoration-primary-600">
                {page.headline}
              </span>
            </motion.h2>
            
            <motion.p 
              className="md:text-body-lg text-body-md font-light text-neutral-700"
              custom={0}
              variants={paragraphVariants}
            >
              {page.paragraph1}
            </motion.p>
            
            <motion.div
              custom={1}
              variants={paragraphVariants}
            >
              <p className="md:text-body-lg text-body-md font-light text-neutral-700">
                {page.paragraph2}
                <br />
                {page.paragraph3}
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            className="lg:col-span-6 flex flex-col gap-8 relative px-4 md:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <GatsbyImage
                image={getImage(data.aboutimage)}
                alt="Interior Design Images"
                className="w-full h-auto"
              />
            </motion.div>
            {/* <img
              src={Logo}
              alt="Logo Ring"
              className="absolute left-[42%] -top-14"
            /> */}
          </motion.div>
        </div>
        <div className="mt-12">
          <hr className="text-neutral-300"></hr>
        </div>
      </div>
    </div>
  )
}
export default About
