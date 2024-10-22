exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Query all blog posts
  const result = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query: ${result.errors}`
    );
    return;
  }

  const blogPostTemplate = require.resolve(`./src/components/blog/BlogPost.js`);

  // Create a page for each blog post
  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}/`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.slug,
      },
    });
  });
};
