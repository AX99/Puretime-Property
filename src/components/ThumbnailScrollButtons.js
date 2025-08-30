import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ThumbnailScrollButtons = ({ 
  onScrollLeft, 
  onScrollRight, 
  canScrollLeft = true, 
  canScrollRight = true,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left Scroll Button */}
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={`p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          canScrollLeft 
            ? 'bg-white hover:bg-neutral-50 text-neutral-800 hover:shadow-xl border border-neutral-200' 
            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
        }`}
        aria-label="Scroll thumbnails left"
      >
        <FaChevronLeft className="w-3 h-3" />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={`p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          canScrollRight 
            ? 'bg-white hover:bg-neutral-50 text-neutral-800 hover:shadow-xl border border-neutral-200' 
            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
        }`}
        aria-label="Scroll thumbnails right"
      >
        <FaChevronRight className="w-3 h-3" />
      </button>
    </div>
  )
}

export default ThumbnailScrollButtons
