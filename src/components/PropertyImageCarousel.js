import React, { useState } from 'react'
import Slider from 'react-slick'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Custom arrow components
const PrevArrow = ({ className, style, onClick }) => (
  <button
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    style={{ ...style }}
    onClick={onClick}
    aria-label="Previous slide"
  >
    <FaChevronLeft className="w-4 h-4" />
  </button>
)

const NextArrow = ({ className, style, onClick }) => (
  <button
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    style={{ ...style }}
    onClick={onClick}
    aria-label="Next slide"
  >
    <FaChevronRight className="w-4 h-4" />
  </button>
)

const PropertyImageCarousel = ({ 
  images, 
  mainImage, 
  showThumbnails = true,
  className = '',
  aspectRatio = 'aspect-video',
  imageHeight = 'h-full'
}) => {
  // Combine main image with other images and filter out any without gatsby image data
  const allImages = [mainImage, ...(images || [])]
    .filter(img => img?.asset?.gatsbyImageData)
  
  const [mainSlider, setMainSlider] = useState(null)
  const [thumbnailSlider, setThumbnailSlider] = useState(null)
  
  // Main slider settings
  const mainSettings = {
    dots: !showThumbnails,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    adaptiveHeight: false,
    asNavFor: thumbnailSlider,
  }
  
  // Thumbnail slider settings
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: allImages.length > 5 ? 5 : allImages.length,
    slidesToScroll: 1,
    arrows: false,
    centerMode: allImages.length > 5,
    focusOnSelect: true,
    asNavFor: mainSlider,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: allImages.length > 3 ? 3 : allImages.length,
        }
      }
    ]
  }
  
  if (allImages.length === 0) {
    return (
      <div className={`${aspectRatio} bg-neutral-200 flex items-center justify-center ${className}`}>
        <p className="text-neutral-500">No images available</p>
      </div>
    )
  }
  
  return (
    <div className={`${className}`}>
      {/* Main Carousel */}
      <div className={`${aspectRatio} bg-neutral-200 overflow-hidden relative mb-2`}>
        <Slider 
          {...mainSettings} 
          ref={slider => setMainSlider(slider)}
          className="h-full"
        >
          {allImages.map((image, index) => (
            <div key={index} className={`${imageHeight} w-full`}>
              <GatsbyImage
                image={getImage(image.asset.gatsbyImageData)}
                alt={`Property image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      
      {/* Thumbnail Carousel */}
      {showThumbnails && allImages.length > 1 && (
        <div className="mt-2">
          <Slider 
            {...thumbnailSettings} 
            ref={slider => setThumbnailSlider(slider)}
          >
            {allImages.map((image, index) => (
              <div key={index} className="px-1">
                <div className="aspect-video overflow-hidden rounded-md border-2 focus-within:border-primary-500 hover:opacity-90 transition-opacity cursor-pointer">
                  <GatsbyImage
                    image={getImage(image.asset.gatsbyImageData)}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default PropertyImageCarousel 