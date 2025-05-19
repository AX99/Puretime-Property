import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPreview = ({ post }) => {
  const { title, createdAt, category, author, featuredImage, summary } = post;

  // Format author name to first name + last initial
  const formatAuthorName = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    if (nameParts.length === 1) return nameParts[0];
    
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1].charAt(0) + ".";
    
    return `${firstName} ${lastInitial}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border border-neutral-100">
      {/* Featured Image */}
      {featuredImage && (
        <div className="relative h-48 md:h-56 overflow-hidden">
        <GatsbyImage
            image={getImage(featuredImage.gatsbyImage)}
            alt={featuredImage.description || title}
            className="w-full h-full object-cover"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent flex items-end">
            <div className="p-4 md:p-6 w-full">
              {/* Date and Category */}
              <div className="flex items-center justify-between text-white/90 text-body-sm mb-2">
                <span>{createdAt}</span>
                {category && (
                  <span className="bg-primary-600/80 px-3 py-1 rounded-full text-white text-body-xs">
                    {category[0].categoryName}
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className="font-display text-display-xs font-semibold text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 md:p-6 flex-grow flex flex-col">
        {/* Summary */}
        {summary && (
          <p className="text-neutral-700 text-body-md line-clamp-3 mb-4 flex-grow">
            {summary}
          </p>
        )}

        {/* Author and Read More */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
          {author && author.name && (
            <span className="text-neutral-600 text-body-sm">By {formatAuthorName(author.name)}</span>
          )}
          <span className="text-primary-600 font-medium flex items-center text-body-sm">
            Read more
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
