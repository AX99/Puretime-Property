import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";

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
            formats: [WEBP, AVIF]
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
      console.error("Element not found");
      return;
    }

    // Apply darker overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    overlay.style.zIndex = "9999";
    overlay.style.transition = "background-color 0.2s";
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    });

    // Increase z-index of the element with fade-in effect
    const originalZIndex = "auto";

    element.style.transition = "z-index 0.2s";
    element.style.zIndex = "100000";

    // Focus on the input inside the element
    const inputElement = element.querySelector("input");
    if (inputElement) {
      inputElement.focus();
    }

    // Revert changes with fade-out effect after 3 seconds
    setTimeout(() => {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
      element.style.zIndex = originalZIndex;
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 1000);
    }, 2000);
  }

  const nodes = data.allHeroJson.nodes;
  const subheadingArray = nodes[0].subheading.split(" ");
  const spanWords = subheadingArray.slice(0, 3).join(" ");
  const backgroundImage = getImage(data.heroimage);
  return (
    <div>
      <div
        // Dark mode - bg-black instead of bg-white
        className="relative content-center bg-white bg-opacity-40 h-dvh bg-blend-overlay py-8"
        style={{
          backgroundImage: `url(${backgroundImage.images.fallback.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="container mx-auto"
          >
            {nodes.map((node, i) => (
              <div
                key={i}
                className="flex flex-col bg-opacity-30 bg-neutral-900 px-4 lg:px-8 xl:px-32 items-center text-center gap-6 py-10 rounded-xl"
              >
                <h1 className="font-display md:text-display-2xl underline underline-offset-4 text-display-lg drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.8)]">
                  {node.header}
                  <span className="text-primary-600">{node.span}</span>
                </h1>
                <p className="col-span-8 md:text-body-xl text-body-lg font-normal max-w-[850px] whitespace-pre-line drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.8)]">
                  <span className="font-bold underline underline-offset-2 decoration-black text-primary-600 drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.8)]">
                    {spanWords}
                  </span>{" "}
                  {subheadingArray.slice(3).join(" ")}{" "}
                </p>
                <ScrollIntoView
                  selector="#banner_input"
                  smooth={true}
                  scrollOptions={{
                    block: "center",
                    inline: "center",
                    behavior: "smooth",
                  }}
                  onClick={() => highlightElement("div_input")}
                  className="pt-8"
                >
                  <img
                    src={CtaButton}
                    alt="Get an offer"
                    className="cursor-pointer transition-color rounded-full border-2 hover:border-primary-600 m-auto left-0 right-0 -top-8 sm:scale-75 md:scale-100 hidden sm:block"
                  />
                </ScrollIntoView>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
