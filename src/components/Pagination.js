import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  
  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Generate visible page numbers with ellipsis
  const getVisiblePageNumbers = () => {
    if (totalPages <= 7) {
      return pageNumbers;
    }
    
    if (currentPage <= 3) {
      return [...pageNumbers.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pageNumbers.slice(totalPages - 5)];
    }
    
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };
  
  const visiblePageNumbers = getVisiblePageNumbers();
  
  return (
    <div className="flex justify-center items-center mt-12 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-md border ${
          currentPage === 1
            ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
            : 'border-primary-600 text-primary-600 hover:bg-primary-50'
        }`}
        aria-label="Previous page"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
      
      {visiblePageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => pageNumber !== '...' ? onPageChange(pageNumber) : null}
          className={`flex items-center justify-center w-10 h-10 rounded-md border ${
            pageNumber === '...'
              ? 'border-transparent cursor-default'
              : pageNumber === currentPage
              ? 'bg-primary-600 text-white border-primary-600'
              : 'border-neutral-300 hover:border-primary-600 hover:text-primary-600'
          }`}
          aria-label={pageNumber === '...' ? 'More pages' : `Page ${pageNumber}`}
          aria-current={pageNumber === currentPage ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-md border ${
          currentPage === totalPages
            ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
            : 'border-primary-600 text-primary-600 hover:bg-primary-50'
        }`}
        aria-label="Next page"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination 