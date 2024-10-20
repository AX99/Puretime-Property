import React from 'react';
import BlogPostHeader from './BlogPostHeader';
import BlogPostContent from './BlogPostContent';

const BlogPost = ({ post }) => {
  return (
    <div>
      <BlogPostHeader post={post} />
      <BlogPostContent post={post} />
    </div>
  );
};

export default BlogPost;