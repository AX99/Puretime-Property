import React from 'react';
import AuthorCard from './AuthorCard';

const BlogPostContent = ({ post }) => {
    return (
        <div>
            {post.content.raw}
            <AuthorCard author={post.author} />
        </div>
    );
};

export default BlogPostContent;