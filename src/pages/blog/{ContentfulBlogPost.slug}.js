import React from 'react'
import BlogPost from '../../components/blog/BlogPost'
import BlogLayout from '../../components/blog/BlogLayout'
import { graphql, useStaticQuery } from 'gatsby'

const BlogPostPage = ({ data }) => {
  // Fetch blog post data using the slug
  console.log('data', data)
  const result = useStaticQuery(graphql`
    query {
      contentfulBlogPost {
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
  `)

  const post = result.contentfulBlogPost

  return (
    <BlogLayout>
      <BlogPost post={post} />
    </BlogLayout>
  )
}

export default BlogPostPage
