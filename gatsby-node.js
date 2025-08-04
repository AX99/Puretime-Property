exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Query all blog posts
  const blogResult = await graphql(`
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
  if (blogResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for blog posts: ${blogResult.errors}`
    );
    return;
  }

  const blogPostTemplate = require.resolve(
    `./src/templates/{ContentfulBlogPost.slug}.js`
  );

  // Create a page for each blog post
  blogResult.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}/`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.slug,
      },
    });
  });

  // Query all properties
  const propertyResult = await graphql(`
    {
      allSanityProperty {
        nodes {
          id
          _id
          slug {
            current
          }
        }
      }
    }
  `);

  // Handle errors
  if (propertyResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for properties: ${propertyResult.errors}`
    );
    return;
  }

  const propertyDetailTemplate = require.resolve(
    `./src/templates/PropertyDetail.js`
  );

  // Create a page for each property
  propertyResult.data.allSanityProperty.nodes.forEach((node) => {
    // Use slug if available, otherwise use ID
    const path = node.slug?.current
      ? `/properties/${node.slug.current}/`
      : `/properties/${node._id}/`;

    createPage({
      path,
      component: propertyDetailTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
