import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto pt-14 px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-center py-8 font-display text-display-xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-primary-600">Blog</span>
        </motion.h1>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 py-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Link to={`/blog/${post.slug}`} className="h-full block">
                <BlogPreview post={post} />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-neutral-600 text-body-md text-center pb-10 italic"
        >
          {totalCount} {totalCount > 1 ? "articles" : "article"}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default BlogList;
