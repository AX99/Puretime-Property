import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import AuthorCard from './AuthorCard';

const BlogPostContent = ({ post }) => {
  const { bodyContent, author, createdAt } = post;

  // Define how to render the rich text from Contentful
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
      [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
      [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
      [MARKS.CODE]: (text) => (
        <code className="font-mono bg-neutral-50 text-primary-600 px-2 py-1 rounded">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-6 text-neutral-700 text-body-md leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="font-display text-display-md md:text-display-lg font-semibold text-neutral-900 mb-6">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="font-display text-display-sm md:text-display-md font-semibold text-neutral-900 mb-5">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="font-display text-display-xs md:text-display-sm font-semibold text-neutral-900 mb-4">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-body-xl font-semibold text-neutral-900 mb-4">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className="text-body-lg font-semibold text-neutral-900 mb-4">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className="text-body-md font-semibold text-neutral-900 mb-4">
          {children}
        </h6>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-6 mb-6 text-neutral-700 space-y-2">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6 mb-6 text-neutral-700 space-y-2">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-primary-600 pl-4 italic my-6 text-neutral-700">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-neutral-200" />,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        try {
          if (node.data?.target?.gatsbyImageData) {
            return (
              <div className="my-8">
                <GatsbyImage
                  image={getImage(node.data.target.gatsbyImageData)}
                  alt={node.data.target.description || "Blog image"}
                  className="rounded-lg shadow-md"
                />
                {node.data.target.description && (
                  <p className="text-body-sm text-neutral-500 mt-2 text-center italic">
                    {node.data.target.description}
                  </p>
                )}
              </div>
            );
          }
          return null;
        } catch (error) {
          console.log("Error rendering embedded asset:", error);
          return null;
        }
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a
            href={uri}
            className="text-primary-600 hover:text-primary-700 font-medium underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        try {
          if (node.data?.target?.slug) {
            return (
              <Link
                to={`/blog/${node.data.target.slug}`}
                className="text-primary-600 hover:text-primary-700 font-medium underline transition-colors"
              >
                {children}
              </Link>
            );
          }
          return <>{children}</>;
        } catch (error) {
          console.log("Error rendering entry hyperlink:", error);
          return <>{children}</>;
        }
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
      {/* Article content */}
      <article className="prose prose-lg max-w-none">
        {bodyContent?.raw && renderRichText(bodyContent, options)}
      </article>
      
      {/* Author section */}
      {author && (
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="mb-4">
            <h3 className="font-display text-display-xs font-semibold text-neutral-900 mb-2">About the Author</h3>
            <AuthorCard author={author} />
          </div>
          <div className="text-body-sm text-neutral-500">
            Published on <time>{createdAt}</time>
          </div>
        </div>
      )}
      
      {/* Post navigation */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <Link
          to="/blog"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to all posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPostContent;
