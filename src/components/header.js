import React from "react";
import { Link } from "gatsby";

import Logo from "../images/logos/logo.svg";
import Button from "./button";
import ScrollIntoView from 'react-scroll-into-view'


const Header = () => {
  const navigation = [
    { name: "About", href: "about" },
    { name: "How It Works", href: "steps" },
  ];
  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex pt-5 justify-between items-center">
            <div className="flex flex-row gap-8 items-center">
              <Link to="/">
                <img className="w-auto" src={Logo} alt="Logo" />
              </Link>
            </div>
            <div className="flex flex-row gap-6">
              <div className="md:flex hidden flex-row gap-4 items-center">
                {navigation.map((item) => (
                  <ScrollIntoView
                    key={item.name} selector={`#${item.href}`}>
                    <a
                      className="cursor-pointer text-body-lg font-medium text-neutral-700 hover:text-primary-600 px-4">
                      {item.name}
                    </a>
                  </ScrollIntoView>
                ))}
              </div>
              <Button label="CONTACT US" link="#" />
            </div>
          </div>
          <div>
            <hr className="text-neutral-700"></hr>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
