import React from "react";
import BlogPost from "../components/blog/BlogPost";
import BlogLayout from "../components/blog/BlogLayout";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";

const BlogPostPage = ({ data }) => {
  // Fetch blog post data using the slug
  const post = data.contentfulBlogPost;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target;
        return <GatsbyImage image={getImage(gatsbyImage)} alt={description} />;
      },
    },
  };

  return (
    <BlogLayout>
      <BlogPost post={post} />
      <div>
        {post.bodyContent?.raw && renderRichText(post.bodyContent, options)}
      </div>
    </BlogLayout>
  );
};

export default BlogPostPage;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      featuredImage {
        id
        description
        gatsbyImage(
          width: 1240
          height: 630
          placeholder: BLURRED
          layout: CONSTRAINED
          formats: [WEBP, AVIF]
        )
      }
      author {
        id
        name
      }
      bodyContent {
        raw
      }
      slug
      updatedAt(formatString: "DD/MM/YYYY")
      createdAt(formatString: "DD/MM/YYYY")
      category {
        categoryName
      }
    }
  }
`;
