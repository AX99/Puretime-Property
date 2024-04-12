import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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

  const nodes = data.allHeroJson.nodes;
  const subheadingArray = nodes[0].subheading.split(" ");
  const spanWords = subheadingArray.slice(0, 3).join(" ")
  return (
    <div>
      <div className="container mx-auto">
        {nodes.map((node) => (
          <div className="flex flex-col xl:px-32 items-center text-center gap-6 py-10">
            <h1 className="font-display md:text-display-2xl underline underline-offset-4 text-display-lg">
              {node.header}<span className="italic text-primary-600">{node.span}</span>
            </h1>
            <p className="col-span-8 md:text-body-xl text-body-lg font-light text-neutral-700 max-w-[800px]">
              <span className="font-bold underline underline-offset-2 decoration-black text-primary-600">{spanWords}</span> {subheadingArray.slice(3).join(" ")}{" "}
            </p>
          </div>
        ))}
      </div>
      <div className="relative">
        <GatsbyImage image={getImage(data.heroimage)} alt="Interior Design" />
        <a href="/">
          <img
            src={CtaButton}
            alt="Get an offer"
            className="absolute rotate-[134deg] transition-color rounded-full border-2 hover:border-primary-600 border- lg:left-[44%] md:left-[42%] left-[40%] -top-8"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
