import React, { useState, useRef, useEffect } from 'react'
import Slider from 'react-slick'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ImageCounter from './ImageCounter'
import ImageLightbox from './ImageLightbox'

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  
  const thumbnailContainerRef = useRef(null)
  
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
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  }

  // Check scroll position for thumbnail buttons
  const checkScrollPosition = () => {
    if (thumbnailContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Scroll thumbnail container
  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current
      const thumbnailWidth = 88 // w-20 (80px) + gap-2 (8px) = 88px
      const visibleThumbnails = Math.floor(container.clientWidth / thumbnailWidth)
      const scrollAmount = thumbnailWidth * Math.max(1, Math.floor(visibleThumbnails / 2))
      
      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  // Handle thumbnail scroll
  useEffect(() => {
    checkScrollPosition()
    const container = thumbnailContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [allImages.length])

  // Open lightbox
  const openLightbox = () => {
    setIsLightboxOpen(true)
  }

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false)
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
            <div key={index} className={`${imageHeight} w-full relative group cursor-pointer`}>
              <GatsbyImage
                image={getImage(image.asset.gatsbyImageData)}
                alt={`Property image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {/* Fullscreen button overlay - always visible */}
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={openLightbox}
                  className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                  aria-label="View fullscreen"
                >
                  <FaExpand className="w-4 h-4" />
                </button>
              </div>
              {/* Clickable overlay for the entire image */}
              <button
                onClick={openLightbox}
                className="absolute inset-0 w-full h-full bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={`View ${index + 1} of ${allImages.length} in fullscreen`}
              />
            </div>
          ))}
        </Slider>

        {/* Image Counter */}
        <ImageCounter 
          currentIndex={currentSlide} 
          totalImages={allImages.length} 
        />
      </div>
      
      {/* Thumbnail Carousel */}
      {showThumbnails && allImages.length > 1 && (
        <div className="mt-2 relative">
          {/* Thumbnail Container with Overlay Buttons */}
          <div className="relative">
            {/* Left Scroll Button - Overlay */}
            {canScrollLeft && (
              <button
                onClick={() => scrollThumbnails('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border border-neutral-200"
                aria-label="Scroll thumbnails left"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>
            )}

            {/* Right Scroll Button - Overlay */}
            {canScrollRight && (
              <button
                onClick={() => scrollThumbnails('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border border-neutral-200"
                aria-label="Scroll thumbnails right"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            )}
            
            {/* Thumbnail Container */}
            <div 
              ref={thumbnailContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allImages.map((image, index) => (
                <div key={index} className="flex-shrink-0">
                  <button
                    className={`aspect-video w-20 overflow-hidden rounded-md border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      index === currentSlide 
                        ? 'border-primary-500 shadow-lg' 
                        : 'border-transparent hover:border-primary-300'
                    }`}
                    onClick={() => {
                      if (mainSlider) {
                        mainSlider.slickGoTo(index)
                      }
                    }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <GatsbyImage
                      image={getImage(image.asset.gatsbyImageData)}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        initialIndex={currentSlide}
      />
    </div>
  )
}

export default PropertyImageCarousel 