import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { getImage } from 'gatsby-plugin-image'

const ImageLightbox = ({ 
  images = [], 
  isOpen, 
  onClose, 
  initialIndex = 0,
  className = '' 
}) => {
  // Convert Gatsby images to lightbox format
  const lightboxImages = images.map((image, index) => {
    try {
      const gatsbyImage = getImage(image.asset.gatsbyImageData)
      
      // Use the largest available image source
      const imageSrc = gatsbyImage.images.sources?.[0]?.srcSet?.split(', ').pop()?.split(' ')[0] || 
                      gatsbyImage.images.fallback.src
      
      return {
        src: imageSrc,
        alt: `Property image ${index + 1}`,
        width: gatsbyImage.width || 1200,
        height: gatsbyImage.height || 800
      }
    } catch (error) {
      console.warn(`Failed to process image ${index}:`, error)
      return null
    }
  }).filter(Boolean) // Filter out any null images

  if (lightboxImages.length === 0) {
    console.warn('No valid images for lightbox')
    return null
  }

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={Math.min(initialIndex, lightboxImages.length - 1)}
      slides={lightboxImages}
      plugins={[Counter, Thumbnails]}
      carousel={{
        finite: true,
        preload: 2
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true
      }}
      animation={{
        fade: 300,
        swipe: 300
      }}
      render={{
        buttonPrev: lightboxImages.length <= 1 ? () => null : undefined,
        buttonNext: lightboxImages.length <= 1 ? () => null : undefined,
        iconNext: () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        ),
        iconPrev: () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        ),
        iconClose: () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        )
      }}
      className={className}
    />
  )
}

export default ImageLightbox
