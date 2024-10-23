import React from "react";
import BlogPost from "../components/blog/BlogPost";
import BlogLayout from "../components/blog/BlogLayout";
import { graphql } from "gatsby";

const BlogPostPage = ({ data }) => {
  // Fetch blog post data using the slug
  const post = data.contentfulBlogPost;

  return (
    <BlogLayout>
      <BlogPost post={post} />
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
