import React from 'react'

const ImageCounter = ({ currentIndex, totalImages, className = '' }) => {
  if (totalImages <= 1) return null

  return (
    <div className={`absolute bottom-4 left-4 z-20 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm ${className}`}>
      {currentIndex + 1} / {totalImages}
    </div>
  )
}

export default ImageCounter
