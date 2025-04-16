import React from 'react'
import BlogPostHeader from './BlogPostHeader'
import BlogPostContent from './BlogPostContent'

const BlogPost = ({ post }) => {
  return (
    <div className="container mx-auto">
      <BlogPostHeader post={post} />
      <div className="grid grid-cols-1 py-6 items-center">
        <BlogPostContent post={post} />
      </div>
    </div>
  )
}

export default BlogPost
