import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { useModal } from "../context/modalContext";

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allFooterJson {
        nodes {
          contact {
            Address
            Company
            Email
            Phone
          }
          social {
            href
            name
            icon {
              publicURL
            }
          }
        }
      }
    }
  `);
  const { openModal } = useModal();
  return (
    <>
      <footer>
        <div className="container mx-auto">
          <div className="mt-2 md:mb-20 mb-10">
            <hr className="text-neutral-300"></hr>
          </div>
          <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-12">
            <div className="lg:col-span-6 md:pr-24">
              <h3 className="font-display md:text-display-lg text-display-sm font-normal pb-4">
                Kick-start your dream home with us
              </h3>
              <a
                href="/#"
                onClick={openModal}
                className="cursor-pointer font-display md:text-display-lg text-display-sm italic text-primary-600 underline decoration-black underline-offset-2">
                Get in contact
              </a>
            </div>
            {data.allFooterJson.nodes[0].contact.map((detail, i) => (
              <div key={i} className="lg:col-span-6 flex flex-col gap-8 xl:pl-30 lg:pl-48">

                <div className="flex flex-col gap-2">

                  <p className="text-display-xs font-display font-normal underline decoration-primary-600">
                    {detail.Company}
                  </p>
                  <p className="text-body-sm font-light text-neutral-900">
                    {detail.Address}.
                  </p>
                </div>
                <div className="flex flex-col gap-2">

                  <p className="text-body-sm font-light text-neutral-900 decoration-primary-600 underline">
                    Email us at:
                  </p>
                  <a
                    className="sm:text-display-xs text-wrap font-display font-normal text-primary-600"
                    href={`mailto:${detail.Email}?subject=Request%20a%20Home%20Valuation`}>
                    {detail.Email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-body-sm font-light text-neutral-900 decoration-primary-600 underline">
                    To speak to someone, call us on
                  </p>
                  <a
                    className="text-display-xs font-display font-normal text-primary-600"
                    href={`tel:${detail.Phone}`}>
                    {detail.Phone}
                  </a>

                </div>

              </div>))}
          </div>
          <div className="md:mt-20 my-10">
            <hr className="text-neutral-300"></hr>
          </div>
          <div className="flex lg:flex-row flex-col gap-8 lg:items-center justify-between mb-10">
            <div className="text-body-md font-light order-2 lg:order-1">
              © {new Date().getFullYear()} Puretime Property Purchasing Ltd. All Rights Reserved.{" "}
              <a href="/#" className="hover:text-primary-600">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="/#" className="hover:text-primary-600">Terms & Conditions</a>
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center md:gap-6 gap-4 order-1 lg:order-2">
              <div className="flex flex-row items-center opacity-70">
                <p className="text-body-sm font-semibold tracking-widest text-neutral-700 pr-4">
                  CONNECT
                </p>
                <hr className="w-16 text-neutral-700"></hr>
              </div>
              <div className="flex flex-row  items-center gap-6">
                {data.allFooterJson.nodes[0].social?.map((node) => (
                  <a
                    href={node.href}
                    key={node.name}
                    target="_blank"
                    rel="noreferrer">
                    <img
                      className="h-10 w-10"
                      src={node.icon.publicURL}
                      alt={node.name}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-black text-white">
        <div className="container mx-auto py-2 pl-4 text-right footer-text">
          <p>Website developed by <a
            href="https://github.com/ax99"
            className="text-primary-600 hover:text-primary-300  ">
            AX99
          </a></p>
        </div>
      </div>
    </>
  );
};
export default Footer;
