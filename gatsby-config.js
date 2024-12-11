/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
  module.exports = {
    siteMetadata: {
      title: "The African",
      description: "The African brings you thought-provoking stories, in-depth analysis, and authentic narratives from Ethiopia and across Africa. Stay informed and inspired as we connect the continent's past, present, and future.",
      siteUrl: "https://www.theafrican.co", // Official website URL
      twitterUsername: "@TheAfrican", // Official Twitter handle
      author: "Kitila", // Primary author or founder
      keywords: [
        "Ethiopia news",
        "African stories",
        "East Africa media",
        "African culture",
        "Ethiopian society",
        "African development",
        "storytelling Africa",
      ], // Primary keywords for SEO
      organization: {
        name: "The African",
        email: "contact@theafrican.co", // Replace with official email
        phone: "+251 123 456 789", // Replace with official phone number
        address: "Addis Ababa, Ethiopia", // Replace with company address
      },
      social: {
        facebook: "https://www.facebook.com/TheAfrican",
        twitter: "https://twitter.com/TheAfrican",
        instagram: "https://www.instagram.com/TheAfrican",
        linkedin: "https://www.linkedin.com/company/theafrican",
        youtube: "https://www.youtube.com/channel/TheAfrican", // Replace with actual links
      },
    },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://wp.theafrican.co/graphql',  // Replace with your WordPress GraphQL endpoint
        verbose: true,
        develop: {
          hardCacheMediaFiles: false,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
