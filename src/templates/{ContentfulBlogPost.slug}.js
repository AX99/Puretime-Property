import React from "react";
import BlogPost from "../components/blog/BlogPost";
import BlogLayout from "../components/blog/BlogLayout";
import { graphql } from "gatsby";
import Seo from "../components/seo";

const BlogPostPage = ({ data }) => {
  // Fetch blog post data using the slug
  const post = data.contentfulBlogPost;
  
  // Prepare SEO data
  const seoImage = post.featuredImage?.gatsbyImage?.images?.fallback?.src;
  const seoDescription = post.summary || `Read our blog post about ${post.title}`;
  
  return (
    <BlogLayout>
      <Seo 
        title={`${post.title} - Puretime Property Blog`}
        description={seoDescription}
        image={seoImage}
      />
      <BlogPost post={post} />
    </BlogLayout>
  );
};

export default BlogPostPage;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      summary
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
