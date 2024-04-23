import React from "react";

import Seo from "../components/seo";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Input from "../components/input";
import About from "../components/about";
import Steps from "../components/steps";
import { ModalProvider } from "../context/modalContext";

const IndexPage = () => (
  <>
    <Seo />
    <Hero />
    <Input />
    <About />
    <Steps />
  </>
);

export default IndexPage;
