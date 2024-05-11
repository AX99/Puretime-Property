import React from "react";
import { Link } from "gatsby";

import Logo from "../images/logos/logo.svg";
import ScrollIntoView from "react-scroll-into-view";
import { useModal } from "../context/modalContext";

const Header = () => {
  const navigation = [
    {
      name: "About",
      href: "about",
    },
    {
      name: "How It Works",
      href: "steps",
    },
  ];

  const { toggleModal } = useModal();
  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex pt-5 justify-between items-center">
            <div className="flex flex-row gap-8 items-center pb-2">
              <Link to="/">
                <img
                  className="max-w-[120px]"
                  width={100}
                  height={100}
                  src={Logo}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex flex-row gap-6">
              <div className="md:flex hidden flex-row gap-4 items-center">
                {navigation.map((item) => (
                  <ScrollIntoView key={item.name} selector={`#${item.href}`}>
                    <p className="cursor-pointer text-body-lg font-medium text-neutral-700 hover:text-primary-600 px-4">
                      {item.name}
                    </p>
                  </ScrollIntoView>
                ))}
              </div>
              <button
                className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 text-white font-semibold cursor-pointer px-5 py-3 text-body-xs"
                onClick={toggleModal}
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
