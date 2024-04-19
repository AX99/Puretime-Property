import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Eyebrow from "./eyebrow";
// import AwardBadge from "../images/award-badge.svg";

const About = () => {
  const data = useStaticQuery(graphql`
    {
      aboutimage: file(relativePath: {eq: "about-creative.png"}) {
        childImageSharp {
          gatsbyImageData(width: 592, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
      allAboutJson {
        nodes {
          section
          headline
          paragraph1
          paragraph2
          paragraph3
        }
      }
    }
  `);
  const page = data.allAboutJson.nodes[0];
  return (
    <div>
      <div id="about" className="container mx-auto">
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-20 lg:py-32 py-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Eyebrow label={page.section} />
            <h2 className="font-display md:text-display-xl text-display-md font-normal pb-4">
              <span className="italic underline underline-offset-2 decoration-primary-600">{page.headline}</span>
            </h2>
            <p className="md:text-body-lg text-body-md font-light text-neutral-700">
              {page.paragraph1}
            </p>
            <p className="md:text-body-lg text-body-md font-light text-neutral-700">
              {page.paragraph2}<br />{page.paragraph3}
            </p>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-8 relative">
            <GatsbyImage
              image={getImage(data.aboutimage)}
              alt="Interior Design"
            />
            {/* <img
              src={AwardBadge}
              alt="Award Badge"
              className="absolute left-[42%] -top-14"
            /> */}
          </div>
        </div>
        <div>
          <hr className="text-neutral-500"></hr>
        </div>
      </div>
    </div>
  );
};
export default About;
