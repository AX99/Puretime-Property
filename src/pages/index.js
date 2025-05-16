import React from 'react'

import Seo from '../components/seo'
import Hero from '../components/hero'
import Steps from '../components/steps'
import Reviews from '../components/Reviews'
import ProblemProperties from '../components/ProblemProperties'
import LendingOpportunities from '../components/LendingOpportunities'
import ModalHashTrigger from '../components/modalHashTrigger'
import CookieConsent from 'react-cookie-consent'

const IndexPage = () => (
  <>
    <ModalHashTrigger />
    <Seo />
    <Hero />
    <Steps />
    <ProblemProperties />
    <Reviews />
    <LendingOpportunities />
    <CookieConsent
      location="bottom"
      buttonText="I Agree"
      cookieName="cookieAgreement"
      overlay={false}
      acceptOnScroll={true}
      buttonClasses="btn btn-primary-600 text-white text-sm"
      // buttonStyle={{
      //   color: "white",
      //   fontSize: "13px",
      // }}
    >
      {' '}
      This website uses cookies to enhance your browsing experience and provide
      personalised content. By continuing to use this site, you consent to our
      use of cookies in accordance with our{' '}
      <a
        href="https://www.termsfeed.com/live/4616b0ab-2778-4f40-8748-da90b0f5fdd1"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline hover:underline text-primary-600"
      >
        cookie policy
      </a>
      {'.'}
    </CookieConsent>
  </>
)

export default IndexPage
