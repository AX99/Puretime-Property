module.exports = {
  siteMetadata: {
    title: `Puretime Property Purchasing`,
    description: `Looking to sell your house quickly? Puretime Property Purchasing offers a hassle-free solution for homeowners across the UK. Say goodbye to the lengthy process of traditional estate agents – with Puretime Property Purchasing, you can receive a quick offer and sell your house on your terms. Discover how we can help you unlock the cash from your home with our streamlined and transparent approach to selling property.`,
    siteUrl: `https://puretimepropertypurchasing.com`,
    author: `@PuretimeA`, // Replace with your twitter handle
  },
  plugins: [
    `gatsby-plugin-postcss`,
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
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `GA-TRACKING_ID`, // Replace with your Google Analytics tracking ID
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`,
    // Use this plugin if you are deploying you site to Gatsby Cloud
    // To learn more, visit: https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-gatsby-cloud/
    // `gatsby-plugin-gatsby-cloud`,
  ],
};
