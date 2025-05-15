import React from 'react'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'

// Animation variants
const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: 30
  },
  visible: (custom) => ({ 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      delay: custom * 0.2 + 0.3,
      ease: "easeOut"
    }
  })
}

/**
 * ImageGallery - A reusable component for displaying image galleries with various layouts
 * @param {Array} images - Array of image objects (imageData, alt)
 * @param {string} layout - Layout style ('grid', 'overlapping', 'masonry', etc.)
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element}
 */
const ImageGallery = ({ 
  images = [],
  layout = 'overlapping',
  className = ''
}) => {
  // Render different layouts based on the layout prop
  const renderLayout = () => {
    switch (layout) {
      case 'overlapping':
        return (
          <div className="relative flex items-center justify-center h-[350px] sm:h-[250px] md:h-[450px]">
            <div className="relative w-full max-w-sm mx-auto">
              {images.length > 0 && (
                <motion.div 
                  custom={1}
                  variants={imageVariants}
                  className="rounded-xl overflow-hidden shadow-xl absolute 
                            sm:left-0 sm:top-8 
                            md:left-0 md:top-12 
                            left-4 top-12 
                            z-10 
                            w-[200px] h-[200px] 
                            sm:w-[180px] sm:h-[180px] 
                            md:w-[280px] md:h-[280px]"
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  {images[0].imageData ? (
                    <GatsbyImage
                      image={images[0].imageData}
                      alt={images[0].alt || "Gallery image"}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <span className="text-neutral-400">Image not available</span>
                    </div>
                  )}
                </motion.div>
              )}
              
              {images.length > 1 && (
                <motion.div 
                  custom={2}
                  variants={imageVariants}
                  className="rounded-xl overflow-hidden shadow-xl absolute 
                            sm:right-0 sm:-top-4
                            md:right-0 md:-top-4 
                            right-4 top-24
                            z-20 
                            w-[180px] h-[180px] 
                            sm:w-[160px] sm:h-[160px] 
                            md:w-[220px] md:h-[220px]"
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  {images[1].imageData ? (
                    <GatsbyImage
                      image={images[1].imageData}
                      alt={images[1].alt || "Gallery image"}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <span className="text-neutral-400">Image not available</span>
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Decorative Elements */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.7, scale: 1, transition: { delay: 0.8, duration: 1 } }}
                viewport={{ once: true }}
                className="absolute w-32 h-32 bg-primary-100 rounded-full -z-10 bottom-0 left-0 hidden md:block"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.2, scale: 1, transition: { delay: 1, duration: 1 } }}
                viewport={{ once: true }}
                className="absolute w-24 h-24 bg-primary-600 rounded-full -z-10 top-1/3 right-0 hidden md:block"
              />
            </div>
          </div>
        );
      
      case 'grid':
        // Implement a standard grid layout
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    }
                  }
                }}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                {image.imageData ? (
                  <GatsbyImage
                    image={image.imageData}
                    alt={image.alt || "Gallery image"}
                    className="w-full h-64"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-neutral-100 flex items-center justify-center">
                    <span className="text-neutral-400">Image not available</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className={className}>
      {renderLayout()}
    </div>
  );
};

export default ImageGallery 