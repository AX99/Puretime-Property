import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'

import { useModal } from '../context/modalContext'
import WorkItem from './workItem'
import Eyebrow from './eyebrow'

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div id="steps" className="container mx-auto">
        <div className="flex flex-col gap-12 lg:py-28 md:py-24 py-12">
          <div className="grid xl:grid-cols-12 grid-cols-1 xl:gap-8 gap-10 items-center">
            <motion.div 
              className="xl:col-span-6 lg:col-span-8 flex flex-col xl:gap-24 md:gap-20 gap-10"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-6">
                <Eyebrow label={page.section} />
                <motion.h3 
                  className="font-display md:text-display-xl text-display-md font-normal pb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <span className="italic underline decoration-primary-600 underline-offset-2">
                    {page.span}
                  </span>
                  {page.headline}
                </motion.h3>
              </div>
              {steps.slice(0, 1).map((node) => (
                <WorkItem
                  key={node.id}
                  image={getImage(node.image)}
                  title={node.title}
                  description={node.description}
                  className="xl:hidden"
                  animate={true}
                />
              ))}
              {steps.slice(1, 2).map((node) => (
                <WorkItem
                  key={node.id}
                  image={getImage(node.image)}
                  title={node.title}
                  description={node.description}
                  className="hidden xl:flex"
                  animate={true}
                />
              ))}
              <div className="xl:flex justify-center hidden items-start">
                <motion.button
                  className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold cursor-pointer px-8 py-4 text-body-sm"
                  onClick={toggleModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  CONTACT US
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              className="xl:col-span-6 lg:col-span-8 flex flex-col xl:gap-24 md:gap-20 gap-10 xl:px-14"
              variants={itemVariants}
            >
              {steps
                .filter((_, index) => index % 2 === 0)
                .map(
                  (
                    node // Selecting first and third items
                  ) => (
                    <WorkItem
                      key={node.id}
                      image={getImage(node.image)}
                      title={node.title}
                      description={node.description}
                      className="hidden xl:flex"
                      animate={true}
                    />
                  )
                )}
              {steps.slice(1, 3).map((node) => (
                <WorkItem
                  key={node.id}
                  image={getImage(node.image)}
                  title={node.title}
                  description={node.description}
                  className="xl:hidden"
                  animate={true}
                />
              ))}
            </motion.div>
          </div>
        </div>
        <div className="xl:hidden flex items-start justify-center">
          <motion.button
            className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold cursor-pointer px-8 py-4 text-body-sm"
            onClick={toggleModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            CONTACT US
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Steps
