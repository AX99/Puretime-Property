import React from "react";

import Seo from "../components/seo";
import Hero from "../components/hero";
import Input from "../components/input";
import About from "../components/about";
import Steps from "../components/steps";
import ModalHashTrigger from "../components/modalHashTrigger";

const IndexPage = () => (
  <>
    <ModalHashTrigger />
    <Seo />
    <Hero />
    <Input />
    <About />
    <Steps />
  </>
);

export default IndexPage;
