import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useModal } from "../context/modalContext";
import { useDrawer } from "../context/drawerContext";
import { motion } from "framer-motion";

import Drawer from "./drawer";
import Logo from "../images/logos/logo.svg";
import navItems from "../data/navItems.json";

const Header = ({ menu }) => {
  const navigation = menu ?? navItems;
  const { toggleModal } = useModal();
  const { toggleDrawer, drawerOpen } = useDrawer();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-40 w-full ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white/90 backdrop-blur-sm"
        }`}
        animate={{
          height: scrolled ? "75px" : "90px",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-row gap-8 items-center">
              <Link to="/" aria-label="Home" className="flex justify-center items-center">
                <motion.div
                  className="flex justify-center items-center"
                  initial={{ width: 100 }}
                  animate={{ width: scrolled ? 90 : 100 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={Logo}
                    alt="Puretime Property Logo"
                    className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </Link>
            </div>
            <div className="flex flex-row gap-4 items-center">
              {/* Mobile menu button */}
              <motion.button
                className="md:hidden flex justify-center items-center w-10 h-10 bg-neutral-100 hover:bg-neutral-200 rounded-full"
                onClick={toggleDrawer}
                aria-label="Open menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
              
              {/* Desktop navigation */}
              <nav className="md:flex hidden flex-row gap-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className="relative px-4 py-2 text-body-md font-medium text-neutral-700 hover:text-primary-600 rounded-md hover:bg-neutral-50 transition-colors"
                      activeClassName="text-primary-600 bg-neutral-50"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              {/* Contact button */}
              <motion.button
                className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold cursor-pointer px-5 py-3 text-body-xs"
                onClick={toggleModal}
                aria-label="Contact us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span>CONTACT US</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Drawer for mobile */}
      {drawerOpen && <Drawer menu={navigation} />}
    </>
  );
};

export default Header;
