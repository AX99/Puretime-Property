import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Header from './header'
import Footer from './footer'
import Modal from './modal'
import BackToTop from './BackToTop'

const Layout = ({ children }) => (
  <>
    <Helmet />
    <Header />
    <div>
      <main>{children}</main>
    </div>
    <Footer />
    <Modal />
    <BackToTop />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
