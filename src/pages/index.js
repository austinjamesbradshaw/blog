import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const projects = data.allMdx.nodes

  if (projects.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>No projects found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <ol className="flex flex-col">
        {projects.map(project => {
          const title = project.frontmatter.title || project.fields.slug

          return (
            <li
              key={project.fields.slug}
              className="pb-4 mb-4 border-b border-border last:border-b-0"
            >
              <Link
                to={project.fields.slug}
                itemProp="url"
                className="hover:opacity-80"
              >
                <article itemScope itemType="http://schema.org/Article">
                  <header>
                    <h2>
                      <span itemProp="headline">{title}</span>
                    </h2>
                    <small>{project.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          project.frontmatter.description || project.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                  {"Read more =>"}
                </article>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { isProjectOverview: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 160)
        fields {
          slug
          projectSlug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          tech
        }
      }
    }
  }
`
