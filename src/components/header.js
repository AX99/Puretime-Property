import React from "react";
import { Link } from "gatsby";

import Modal from "./modal";
import Logo from "../images/logos/logo-dark.svg";
import Button from "./button";

const Header = () => {
  const navigation = [
    { name: "About", href: "#" },
    { name: "How It Works", href: "#" },
  ];
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex py-5 justify-between items-center">
            <div className="flex flex-row gap-8 items-center">
              <Link to="/">
                <img className="w-auto" src={Logo} alt="Logo" />
              </Link>
            </div>
            <div className="flex flex-row gap-6">
              <div className="md:flex hidden flex-row gap-4 items-center">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-body-sm font-medium text-neutral-700 hover:text-primary-600 px-4">
                    {item.name}
                  </a>
                ))}
              </div>
              <Button label="CONTACT US" onClick={() => setShowModal(true)} />
            </div>
          </div>
          <div>
            <hr className="text-neutral-700"></hr>
          </div>
        </div>
      </header>
      <Modal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default Header;
