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
    {
      resolve: `gatsby-plugin-image`,
      options: {
        defaults: {
          formats: [`avif`, `webp`],
          placeholder: `blurred`,
          quality: 90,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`avif`, `webp`],
          placeholder: `blurred`,
          quality: 90,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
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
        icon: `src/images/favicon.png`,
        cache_busting_mode: 'none',
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: `${process.env.MAILCHIMP_KEY}`,
        timeout: 3500,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
        accessToken:
          process.env.NODE_ENV === "development"
            ? process.env.CONTENTFUL_PREVIEW_ACCESS
            : process.env.CONTENTFUL_DELIVERY_ACCESS,
        ...(process.env.NODE_ENV === "development" && {
          host: `preview.contentful.com`,
        }),
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: process.env.NODE_ENV === "development" ? true : false,
        overlayDrafts: process.env.NODE_ENV === "development" ? true : false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `${process.env.GA_TRACKING_ID}`,
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `${process.env.ADSENSE_PUBLISHER_ID}`,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/dev-404-page`, `/404`, `/404.html`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: (data) => {
          return data.site.siteMetadata.siteUrl
        },
        resolvePages: (data) => {
          return data.allSitePage.nodes
        },
        serialize: (page, { resolvePagePath }) => {
          return {
            url: page.path,
            changefreq: `daily`,
            priority: page.path === '/' ? 1.0 : 0.7,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://puretimepropertypurchasing.com`,
        sitemap: `https://puretimepropertypurchasing.com/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/blog/*`, `/properties/*`],
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\/page-data\.json/,
              handler: `NetworkFirst`,
            },
            {
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: `StaleWhileRevalidate`,
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `StaleWhileRevalidate`,
            },
          ],
        },
      },
    },
  ],
};
