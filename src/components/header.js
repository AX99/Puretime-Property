import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { useModal, FORM_TYPES } from "../context/modalContext";
import { useDrawer } from "../context/drawerContext";
import { motion, AnimatePresence } from "framer-motion";

import Drawer from "./drawer";
import Logo from "../images/logos/logo.svg";
import navItems from "../data/navItems.json";

const Header = ({ menu }) => {
  const navigation = menu ?? navItems;
  const { toggleModal } = useModal();
  const { toggleDrawer, drawerOpen } = useDrawer();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Add scroll effect with debouncing to prevent flickering
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timer = null;
    let lastStateChangeTime = Date.now();
    const MIN_TIME_BETWEEN_CHANGES = 300; // ms minimum time between state changes
    
    const handleScroll = () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      
      timer = setTimeout(() => {
        // Add buffer for scrolling up vs down to prevent flickering
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        
        // Use much higher thresholds to prevent flickering
        // This creates a larger buffer zone, especially at the top of the page
        const threshold = scrollingDown ? 30 : 20;
        
        const shouldBeScrolled = currentScrollY > threshold;
        
        // Only allow state changes after minimum time has passed
        const now = Date.now();
        if (shouldBeScrolled !== scrolled && (now - lastStateChangeTime > MIN_TIME_BETWEEN_CHANGES)) {
          setScrolled(shouldBeScrolled);
          lastStateChangeTime = now;
        }
        
        lastScrollY = currentScrollY;
      }, 50); // Longer timeout to further reduce rapid toggles
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [scrolled]);

  // Handle dropdown functionality
  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setActiveDropdown(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
                  animate={{ width: scrolled ? 90 : 95 }}
                  height={"auto"}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={Logo}
                    alt="Puretime Property Logo"
                    className="w-3/4 h-auto"
                    whileHover={{ scale: 1.2 }}
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
              <nav className="md:flex hidden flex-row gap-1" ref={dropdownRef}>
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative"
                  >
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className="flex items-center px-4 text-body-md font-medium text-neutral-700 hover:text-primary-600 rounded-md hover:bg-neutral-50 transition-colors"
                        >
                          {item.name}
                          <svg 
                            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-50"
                            >
                              {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.href}
                                  onClick={handleDropdownClose}
                                  className="block px-4 py-3 text-body-md font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 transition-colors group"
                                >
                                  <div className="font-semibold group-hover:text-primary-600">
                                    {dropdownItem.name}
                                  </div>
                                  {dropdownItem.description && (
                                    <div className="text-body-sm text-neutral-500 mt-1">
                                      {dropdownItem.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="relative px-4 py-2 text-body-md font-medium text-neutral-700 hover:text-primary-600 rounded-md hover:bg-neutral-50 transition-colors"
                        activeClassName="text-primary-600 bg-neutral-50"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              
              {/* Contact button */}
              <motion.button
                className="button rounded-full flex gap-1 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold cursor-pointer px-5 py-3 text-body-xs"
                onClick={() => toggleModal({ type: FORM_TYPES.PROPERTY_SELLER })}
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
