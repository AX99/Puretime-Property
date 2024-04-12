import React from "react";

import Seo from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";
// import Metrics from "../components/metrics";
// import Services from "../components/services";
import Awards from "../components/awards";
import About from "../components/about";
import Steps from "../components/steps";

const IndexPage = () => (
  <Layout>
    <Seo />
    <Hero />
    <Awards />
    <About />
    {/* <Metrics /> */}
    {/* <Services /> */}
    <Steps />
  </Layout>
);

export default IndexPage;
