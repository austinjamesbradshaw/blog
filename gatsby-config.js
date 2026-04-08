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
    title: `Austin's Blog`,
    author: {
      name: `Austin Bradshaw`,
      title: `Fullstack Engineer · The Woodlands, TX`,
      summary: `The best things you've ever used had something in common: somewhere along the way, someone was thinking about you. I hold this standard close.\n\nCurrently at Lockheed Martin building enterprise applications that empower employee experiences. Previously served as Founding Engineer of global SaaS, "Base".`,
    },
    description: `A blog to document my personal projects.`,
    siteUrl: `https://austinjamesbradshaw.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },

    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => ({
                title: node.frontmatter.title,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              }))
            },
            query: `
            {
              allMdx(
                sort: { frontmatter: { date: DESC } }
                filter: { fields: { isProjectOverview: { eq: true } } }
              ) {
                nodes {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "My Developer Projects RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `My Developer Projects`,
        short_name: `DevProjects`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // change to your own icon
      },
    },
  ],
}
