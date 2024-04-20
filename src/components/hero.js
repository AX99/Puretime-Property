import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import ScrollIntoView from "react-scroll-into-view";
import CtaButton from "../images/cta-button.svg";

const Hero = () => {
  const data = useStaticQuery(graphql`
    {
      heroimage: file(relativePath: { eq: "hero-image.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 5120
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      allHeroJson {
        nodes {
          header
          span
          subheading
            
        }
      }
    }
  `);

  function highlightElement(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error('Element not found');
      return;
    }


    // Apply darker overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    overlay.style.zIndex = '9999';
    overlay.style.transition = 'background-color 0.2s';
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    });

    // Increase z-index of the element with fade-in effect
    const originalZIndex = 'auto';

    element.style.transition = 'z-index 0.2s';
    element.style.zIndex = '100000';


    // Focus on the input inside the element
    const inputElement = element.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }

    // Revert changes with fade-out effect after 3 seconds
    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      element.style.zIndex = originalZIndex;
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 1000);
    }, 2000);
  }

  const nodes = data.allHeroJson.nodes;
  const subheadingArray = nodes[0].subheading.split(" ");
  const spanWords = subheadingArray.slice(0, 3).join(" ")
  return (
    <div>
      <div className="container mx-auto">
        {nodes.map((node, i) => (
          <div key={i} className="flex flex-col xl:px-32 items-center text-center gap-6 py-10">
            <h1 className="font-display md:text-display-2xl underline underline-offset-4 text-display-lg">
              {node.header}<span className="italic text-primary-600">{node.span}</span>
            </h1>
            <p className="col-span-8 md:text-body-xl text-body-lg font-light text-neutral-700 max-w-[850px] whitespace-pre-line">
              <span className="font-bold underline underline-offset-2 decoration-black text-primary-600">{spanWords}</span> {subheadingArray.slice(3).join(" ")}{" "}
            </p>
          </div>
        ))}
      </div>
      <div className="relative">
        <GatsbyImage image={getImage(data.heroimage)} alt="Interior Design" />
        <ScrollIntoView selector="#banner_input" onClick={() => highlightElement('div_input')}>
          <img
            src={CtaButton}
            alt="Get an offer"
            className="absolute cursor-pointer rotate-[134deg] transition-color rounded-full border-2 hover:border-primary-600 m-auto left-0 right-0 -top-8 hidden md:block"
          />
        </ScrollIntoView>
      </div>
    </div>
  );
};

export default Hero;
