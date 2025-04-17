import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'

const BlogPreview = ({ post }) => {
  return (
    <div className="h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative">
        <GatsbyImage
          className="w-full h-56 object-cover"
          image={getImage(post.featuredImage)}
          alt={post.title}
        />
        <div className="absolute -bottom-2 left-5 flex flex-col items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-md shadow-md">
          <span className="text-lg font-bold">{post.createdAt.split('/')[0]}</span>
          <span className="text-sm">{post.createdAt.split('/')[1]}</span>
        </div>
      </div>
      
      <div className="p-6 pt-8">
        <div className="mb-2">
          {post.category && post.category[0] && (
            <span className="inline-block bg-neutral-100 text-primary-600 text-xs px-3 py-1 rounded-full font-medium">
              {post.category[0].categoryName}
            </span>
          )}
        </div>
        
        <h2 className="font-display text-display-xs font-bold mb-3 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">
          {post.summary}
        </p>
        
        <div className="flex justify-end items-center mt-3">
          <motion.span 
            className="text-primary-600 font-medium inline-flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.span>
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
