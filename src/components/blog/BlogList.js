import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import BlogPreview from "./BlogPreview";

const BlogList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { createdAt: DESC }) {
        totalCount
        nodes {
          createdAt(formatString: "DD/MMM")
          title
          summary
          slug
          id
          category {
            categoryName
          }
          author {
            name
          }
          bodyContent {
            raw
          }
          featuredImage {
            id
            gatsbyImage(
              width: 1200
              height: 630
              placeholder: BLURRED
              layout: CONSTRAINED
              formats: [WEBP, AVIF]
            )
            description
          }
        }
      }
    }
  `);

  const posts = data.allContentfulBlogPost.nodes;
  const totalCount = data.allContentfulBlogPost.totalCount;

  return (
    <div>
      <div className="container mx-auto pt-14">
        <h1 className="italic underline underline-offset-2 decoration-primary-600 text-center py-7 font-display text-display-xl">
          Blog
        </h1>
        <div className="grid lg:grid-cols-3 center grid-cols-1 lg:gap-8 gap-20 lg:py-30 py-12 items-center">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <BlogPreview key={post.id} post={post} />
            </Link>
          ))}
        </div>
        <p>
          {totalCount} {totalCount > 1 ? "posts" : "post"}
        </p>
      </div>
    </div>
  );
};

export default BlogList;
