import React from "react";

import Seo from "../components/seo";
import Hero from "../components/hero";
import Input from "../components/input";
import About from "../components/about";
import Steps from "../components/steps";
import HiddenForm from "../components/hidden_form";

const IndexPage = () => (
  <>
    <Seo />
    <Hero />
    <Input />
    <About />
    <Steps />
    <HiddenForm />
  </>
);

export default IndexPage;
