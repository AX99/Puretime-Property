import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

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
  return (
    <div>
      <div id="steps" className="container mx-auto">
        <div className="flex flex-col gap-12 lg:py-28 md:py-24 py-12">
          <div className="grid xl:grid-cols-12 grid-cols-1 xl:gap-8 gap-10 items-center">
            <div className="xl:col-span-6 lg:col-span-8 flex flex-col xl:gap-24 md:gap-20 gap-10">
              <div className="flex flex-col gap-6">
                <Eyebrow label={page.section} />
                <h3 className="font-display md:text-display-xl text-display-md font-normal pb-4">
                  <span className="italic underline decoration-primary-600 underline-offset-2">
                    {page.span}
                  </span>
                  {page.headline}
                </h3>
              </div>
              {steps.slice(0, 1).map((node) => (
                <WorkItem
                  key={node.id}
                  image={getImage(node.image)}
                  title={node.title}
                  description={node.description}
                  className="xl:hidden"
                />
              ))}
              {steps.slice(1, 2).map((node) => (
                <WorkItem
                  key={node.id}
                  image={getImage(node.image)}
                  title={node.title}
                  description={node.description}
                  className="hidden xl:flex"
                />
              ))}
              <div className="xl:flex justify-center hidden items-start">
                <button
                  className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 text-white font-semibold cursor-pointer px-6 py-4 text-body-sm"
                  onClick={toggleModal}
                >
                  CONTACT US
                </button>
              </div>
            </div>
            <div className="xl:col-span-6 lg:col-span-8 flex flex-col xl:gap-24 md:gap-20 gap-10 xl:px-14">
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
                />
              ))}
            </div>
          </div>
        </div>
        <div className="xl:hidden flex items-start justify-center">
          <button
            className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 text-white font-semibold cursor-pointer px-6 py-4 text-body-sm"
            onClick={toggleModal}
          >
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  )
}

export default Steps
