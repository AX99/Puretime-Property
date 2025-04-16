import React from 'react'
import AuthorCard from './AuthorCard'

const BlogPostContent = ({ post }) => {
  return (
    <div>
      <p className="text-neutral-700 pb-4">{post.category[0].categoryName}</p>
      {post.bodyContent.raw}
      <AuthorCard author={post.author} />
      <p>{post.createdAt}</p>
    </div>
  )
}

export default BlogPostContent
