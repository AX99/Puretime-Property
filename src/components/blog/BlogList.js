import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { motion } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";
import BlogPreview from "./BlogPreview";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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
    <>
      {/* Hero Section - matches other pages */}
      <section className="relative bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <StaticImage 
            src="../../images/assets/blog-hero.jpg" 
            alt="Blog"
            className="w-full h-full object-cover"
            objectPosition="center" 
          />
        </div>
        
        {/* Content */}
        <div className="container relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="inline-block bg-primary-600/10 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold tracking-wide uppercase text-body-md">
                OUR BLOG
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="font-display text-display-lg md:text-display-xl font-semibold text-neutral-900 mb-6">
              Insights & <span className="italic text-primary-600">Resources</span>
            </motion.h1>
            
            <motion.div variants={fadeIn} className="w-24 h-1 bg-primary-600 mx-auto mb-8"></motion.div>
            
            <motion.p variants={fadeIn} className="text-body-lg text-neutral-700 max-w-2xl mx-auto">
              Insights, tips and stories about property buying, selling and investment from our team of experts.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-12">
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
              className="text-neutral-600 text-body-md text-center"
            >
              {totalCount} {totalCount > 1 ? "articles" : "article"}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
