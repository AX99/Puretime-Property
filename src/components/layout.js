import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import Header from "./header";
import Footer from "./footer";
import Modal from "./modal";

const Layout = ({ children }) => (
  <>
    <Helmet>
      <script src="https://gumroad.com/js/gumroad.js" />
    </Helmet>
    <Header />
    <div>
      <main>{children}</main>
    </div>
    <Footer />
    <Modal />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
