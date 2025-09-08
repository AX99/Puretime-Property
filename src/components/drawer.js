import React, { useState } from "react";
import { Link } from "gatsby";
import { useDrawer } from "../context/drawerContext";
import Logo from "../images/logos/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

const Drawer = ({ menu }) => {
  const { toggleDrawer } = useDrawer();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemToggle = (itemName) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  return (
    <AnimatePresence>
      {/* Backdrop with fade-in animation */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={toggleDrawer}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      ></motion.div>
      
      {/* Drawer with slide-in animation */}
      <motion.div 
        className="fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-50 overflow-y-auto"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Header with logo and close button */}
          <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
            <Link to="/" onClick={toggleDrawer}>
              <img
                className="max-w-[100px]"
                width={100}
                height={40}
                src={Logo}
                alt="Puretime Property Logo"
              />
            </Link>
            <motion.button 
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              onClick={toggleDrawer}
              aria-label="Close menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 pt-6">
            <ul className="space-y-1">
              {menu.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleItemToggle(item.name)}
                        className="flex items-center justify-between w-full py-3 px-4 text-body-lg font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors"
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expandedItem === item.name ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {expandedItem === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className="block py-2 px-4 text-body-md font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors"
                                activeClassName="text-primary-600 bg-neutral-50"
                                onClick={toggleDrawer}
                              >
                                <div className="font-semibold">{dropdownItem.name}</div>
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
                      className="flex py-3 px-4 text-body-lg font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors"
                      activeClassName="text-primary-600 bg-neutral-50"
                      onClick={toggleDrawer}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="border-t border-neutral-200 pt-4 mt-auto">
            <motion.button
              className="w-full rounded-md flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold cursor-pointer px-5 py-3 text-body-sm transition-colors"
              onClick={toggleDrawer}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CLOSE MENU
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drawer;
