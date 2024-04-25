import React from "react";

import Seo from "../components/seo";
import Hero from "../components/hero";
import Input from "../components/input";
import About from "../components/about";
import Steps from "../components/steps";
import HiddenForm from "../components/hidden_form";

const IndexPage = () => (
  <>
    <HiddenForm />
    <Seo />
    <Hero />
    <Input />
    <About />
    <Steps />
  </>
);

export default IndexPage;
