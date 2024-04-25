module.exports = {
  trailingSlash: `never`,
  siteMetadata: {
    title: `Puretime Property Purchasing`,
    description: `Looking to sell your house quickly? Puretime Property Purchasing offers a hassle-free solution for homeowners across the UK. Say goodbye to the lengthy process of traditional estate agents – with Puretime Property Purchasing, you can receive a quick offer and sell your house on your terms. Discover how we can help you unlock the cash from your home with our streamlined and transparent approach to selling property.`,
    siteUrl: `https://puretimepropertypurchasing.com`,
    author: `@PuretimeA`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Puretime Property Purchasing`,
        short_name: `Puretime Property`,
        theme_color: `#BD8334`,
        start_url: `/`,
        background_color: `#BD8334`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // Replace with your favicon (This path is relative to the root of the site)
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`, 
  ],
};
