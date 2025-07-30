import React from 'react'
import BlogPostHeader from './BlogPostHeader'
import BlogPostContent from './BlogPostContent'

const BlogPost = ({ post }) => {
  return (
    <>
      <BlogPostHeader post={post} />
      <BlogPostContent post={post} />
    </>
  )
}

export default BlogPost
