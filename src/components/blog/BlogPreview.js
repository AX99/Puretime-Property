import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPreview = ({ post }) => {
  // console.log(post);

  return (
    <div>
      <div className="relative">
        <GatsbyImage
          className="rounded-t-md"
          image={getImage(post.featuredImage)}
          alt={post.title}
        />
        <p className="absolute -bottom-2 left-3 block p-4 rounded bg-primary-600 text-center text-white">
          <h3>{post.createdAt.split("/")[0]}</h3>
          <p>{post.createdAt.split("/")[1]}</p>
        </p>
      </div>
      <div className="md:pl-16 md:pt-8 md:pr-8 md:pb-6 p-4 shadow-neutral-500 shadow-md rounded-b-md">
        <h2 className="font-display text-display-xs sm:text-display-sm">
          {post.title}
        </h2>
        <p className="text-body-lg text-neutral-500 pb-2">{post.summary}</p>
        <ul className="font-thin text-right pt-2">
          <li>{post.category[0].categoryName}</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogPreview;
