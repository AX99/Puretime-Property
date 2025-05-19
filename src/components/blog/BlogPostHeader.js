import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";

const BlogPostHeader = ({ post }) => {
  const { title, createdAt, author, category, featuredImage } = post;
  
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
    <div className="relative w-full h-[50vh] min-h-[400px] mb-12">
      {/* Featured Image */}
      {featuredImage ? (
        <GatsbyImage
          image={getImage(featuredImage.gatsbyImage)}
          alt={featuredImage.description || title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-700"></div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/70 to-neutral-900/40"></div>

      {/* Back link */}
      <div className="absolute top-8 left-8">
        <Link
          to="/blog"
          className="text-white hover:text-primary-100 font-medium flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Content - Centered vertically and horizontally */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Title first for emphasis */}
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl font-semibold text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Meta information below */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-body-sm">
              <time>{createdAt}</time>
              
              {category && (
                <span className="before:content-['•'] before:mr-4 bg-primary-600/80 px-3 py-1 rounded-full text-white">
                  {category[0].categoryName}
                </span>
              )}
              
              {author && author.name && (
                <span className="before:content-['•'] before:mr-4">
                  By {formatAuthorName(author.name)}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHeader;
