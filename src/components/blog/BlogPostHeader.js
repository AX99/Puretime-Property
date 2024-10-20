import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Breadcrumb from "../Breadcrumb";

const BlogPostHeader = ({ post }) => {
  const items=[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]
  const image = getImage(post.featuredImage);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>Category: {post.category[0].categoryName}</p>
      <p>Author: {post.author.name}</p>
      <p>Created: {post.createdAt}</p>
      <p>Updated: {post.updatedAt}</p>
      <Breadcrumb const items={items} />
      <GatsbyImage image={image} alt={post.featuredImage.description} />
    </div>
  );
};

export default BlogPostHeader;
