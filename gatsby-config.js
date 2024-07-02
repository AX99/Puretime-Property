require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: `${process.env.MAILCHIMP_KEY}`,
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          `${process.env.GA_TRACKING_ID}`, // Google Analytics / GA
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `${process.env.ADSENSE_PUBLISHER_ID}`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`,
  ],
};
