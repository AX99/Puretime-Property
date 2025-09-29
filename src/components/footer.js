import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { motion } from 'framer-motion'
import { useModal, FORM_TYPES } from '../context/modalContext'
import navItems from '../data/navItems.json'
import Memberships from './memberships'

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

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allFooterJson {
        nodes {
          contact {
            Address
            Company
            Email
            Phone
          }
          social {
            href
            name
            icon {
              publicURL
            }
          }
        }
      }
    }
  `)
  const { toggleModal } = useModal()
  return (
    <>
      {/* <section className="pt-16 md:py-16 bg-neutral-50">
        <div className="container mx-auto">
          <CTABanner 
            heading="Ready to sell your property fast?"
            description="Get a no-obligation cash offer from our team. We can complete the purchase in as little as 30 days."
            buttonText="Request Your Free Valuation"
            className=""
            formType={FORM_TYPES.PROPERTY_SELLER}
          />
        </div>
      </section> */}

      <footer className="bg-white pt-16 pb-0">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <div className="md:mb-16 mb-10">
              <hr className="text-neutral-300"></hr>
            </div>

            <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-10 gap-12">
              <motion.div
                variants={fadeIn}
                className="lg:col-span-6 md:pr-8"
              >
                <h3 className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-4 leading-tight">
                  Want To Sell Your Property <span className="italic text-primary-600">Fast</span>?
                </h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal({ type: FORM_TYPES.PROPERTY_SELLER });
                  }}
                  className="bg-transparent border-0 cursor-pointer font-display text-body-xl md:text-display-sm text-primary-600 font-medium hover:text-primary-700 transition-colors relative inline-block group"
                >
                  Get In Contact →
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black origin-left duration-300 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </button>

                {/* Desktop Navigation Links */}
                <div className="mt-8 hidden lg:block">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {/* Column 1 */}
                    <div>
                      <p className="text-body-md font-medium text-neutral-900 mb-3">Navigation</p>
                      <ul className="space-y-2">
                        {navItems.slice(0, Math.ceil(navItems.length / 2)).map((item, index) => (
                          <li key={index}>
                            <a href={item.href} className="relative inline-block group text-primary-600 hover:text-primary-700 transition-colors w-fit">
                              {item.name}
                              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black origin-left duration-300 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Column 2 */}
                    <div>
                      <p className="text-body-md font-medium text-neutral-900 mb-3">&nbsp;</p>
                      <ul className="space-y-2">
                        {navItems.slice(Math.ceil(navItems.length / 2)).map((item, index) => (
                          <li key={index}>
                            <a href={item.href} className="relative inline-block group text-primary-600 hover:text-primary-700 transition-colors w-fit">
                              {item.name}
                              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black origin-left duration-300 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Navigation Links - placed outside the grid */}

              {data.allFooterJson.nodes[0].contact.map((detail, i) => (
                <motion.div
                  variants={fadeIn}
                  key={i}
                  className="lg:col-span-6 flex flex-col gap-8 xl:pl-16 lg:pl-8"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-display-xs font-display font-semibold text-neutral-900">
                      {detail.Company}
                    </p>
                    <div className="w-12 h-1 bg-primary-600 mb-2"></div>
                    <p className="text-body-md font-medium text-neutral-900">
                      Call us on:
                    </p>
                    <a
                      className="text-display-xs font-display font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                      href={`tel:${detail.Phone}`}
                    >
                      {detail.Phone}
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-body-md font-medium text-neutral-900">
                      Email us at:
                    </p>
                    <a
                      className="text-body-lg font-display font-medium text-primary-600 hover:text-primary-700 transition-colors md:break-normal break-all"
                      href={`mailto:${detail.Email}?subject=Property%20Enquiry`}
                    >
                      <span className="md:hidden">
                        {detail.Email.split('@')[0]}@<br />
                        {detail.Email.split('@')[1]}
                      </span>
                      <span className="hidden md:inline">
                        {detail.Email}
                      </span>
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-body-md font-medium text-neutral-900">
                      Find us at:
                    </p>
                    <p className="text-body-md font-normal text-neutral-700">
                      <span className="md:hidden">
                        {/* Format address for mobile with line breaks */}
                        {detail.Address.split(',')[0]},<br />
                        {detail.Address.split(',')[1]},<br />
                        {detail.Address.split(',')[2]},<br />
                        {detail.Address.split(',')[3]},<br />
                        {detail.Address.split(',')[4]}
                      </span>
                      <span className="hidden md:inline">
                        {/* Format address for desktop with natural commas */}
                        {detail.Address}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Navigation Links - after the main content grid */}
            <motion.div
              variants={fadeIn}
              className="lg:hidden mt-12 mb-10"
            >
              <h4 className="text-display-xs font-display font-semibold text-neutral-900 mb-5">Site Navigation</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="relative inline-block group text-primary-600 hover:text-primary-700 transition-colors w-fit"
                    >
                      {item.name}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black origin-left duration-300 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Memberships Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mt-8 md:mt-12 mb-8 md:mb-16"
            >
              <hr className="text-neutral-300 mb-8"></hr>
              <div className="text-left lg:text-center">
                {/* <p className="text-body-sm font-semibold tracking-widest text-neutral-600 mb-4 uppercase">
                  Professional Memberships
                </p> */}
                <div className="flex items-start lg:items-center justify-start lg:justify-center gap-8 lg:gap-12">
                  <Memberships />
                </div>
              </div>
              <hr className="text-neutral-300 mt-8"></hr>
            </motion.div>

            <div className="flex lg:flex-row flex-col gap-8 lg:items-center justify-between mb-10">
              <div className="text-body-md font-normal text-neutral-700 order-2 lg:order-1">
                © {new Date().getFullYear()} Puretime Property Purchasing Ltd (Company No. 15621068).
                Registered in England and Wales.
              </div>

              <div className="flex lg:flex-row flex-col lg:items-center md:gap-6 gap-4 order-1 lg:order-2">
                <div className="flex flex-row items-center">
                  <p className="text-body-sm font-semibold tracking-widest text-primary-600 pr-4">
                    CONNECT WITH US
                  </p>
                  <hr className="w-16 text-primary-600"></hr>
                </div>
                <div className="flex flex-row items-center gap-6">
                  {data.allFooterJson.nodes[0].social?.map((node) => (
                    <a
                      href={node.href}
                      key={node.name}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        className="h-8 w-8"
                        src={node.icon.publicURL}
                        alt={node.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        <div className="bg-primary-600 text-white">
          <div className="container mx-auto py-4 px-4 text-center md:text-right">
            <span className="inline-block relative cursor-pointer group mx-3">
              <a
                href="https://www.termsfeed.com/live/4616b0ab-2778-4f40-8748-da90b0f5fdd1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md font-medium hover:text-neutral-100 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-left duration-300 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </span>
            <span className="mx-4 text-white/50">|</span>
            <span className="inline-block relative cursor-pointer group mx-3">
              <a
                href="https://www.termsfeed.com/live/3288219f-0446-4f5b-a96d-715e41f260c1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md font-medium hover:text-neutral-100 transition-colors"
              >
                Terms & Conditions
              </a>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-left duration-300 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer
