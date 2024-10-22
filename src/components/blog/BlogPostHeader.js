import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Breadcrumb from '../Breadcrumb'

const BlogPostHeader = ({ post }) => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ]
  const image = getImage(post.featuredImage)
  return (
    <div>
      <h1 className="italic underline underline-offset-2 decoration-primary-600 text-center py-7 font-display text-display-xl">
        {post.title}
      </h1>
      <Breadcrumb items={items} />
      <GatsbyImage image={image} alt={post.featuredImage.description} />
    </div>
  )
}

export default BlogPostHeader
