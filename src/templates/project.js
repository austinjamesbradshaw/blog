import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectTemplate = ({ data, children, location }) => {
  const project = data.mdx
  const devlogs = data.allMdx.nodes

  const hasDevlogs = devlogs.length > 0

  return (
    <Layout location={location} projectName={project.frontmatter.title}>
      <article>
        <div className="mb-12">{children}</div>

        {hasDevlogs && (
          <section>
            <h3 className="mb-4 uppercase font-semibold">Dev Log</h3>

            <div className="flex flex-col">
              {devlogs.map(log => (
                <Link
                  to={log.fields.slug}
                  className="hover:opacity-80 pb-4 mb-4 border-b border-border last:border-b-0"
                >
                  <div key={log.fields.slug}>
                    <h3>{log.frontmatter.title}</h3>
                    <small>{log.frontmatter.date}</small>

                    {log.excerpt && <p>{log.excerpt}</p>}

                    <Link to={log.fields.slug}>{"Read more =>"}</Link>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  )
}

export const Head = ({ data }) => {
  const project = data.mdx
  return (
    <Seo
      title={project.frontmatter.title}
      description={project.frontmatter.description || project.excerpt}
    />
  )
}

export default ProjectTemplate

// ──────────────────────────────────────────────────────────────
// GraphQL Query
export const pageQuery = graphql`
  query ProjectTemplate($id: String!, $projectSlug: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tech
      }
    }

    # Get all devlogs for this project
    allMdx(
      filter: {
        fields: { projectSlug: { eq: $projectSlug }, isDevlog: { eq: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        excerpt(pruneLength: 160)
      }
    }
  }
`
