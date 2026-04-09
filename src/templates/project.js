import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectTemplate = ({ data, children, location }) => {
  const project = data.mdx
  const devlogs = data.allMdx.nodes

  const hasDevlogs = devlogs.length > 0

  const [sortOrder, setSortOrder] = React.useState("Newest First")
  const handleSort = () =>
    setSortOrder(prev =>
      prev === "Newest First" ? "Oldest First" : "Newest First"
    )
  const sortDevlogs = (a, b) =>
    sortOrder === "Newest First"
      ? new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      : new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime()

  return (
    <Layout location={location} projectName={project.frontmatter.title}>
      <article>
        <div className="mb-12">{children}</div>

        {hasDevlogs && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-muted-foreground text-sm tracking-wider font-mono uppercase">
                Dev Log
              </h3>
              <button
                className="font-mono text-xs uppercase hover:text-primary text-muted-foreground cursor-pointer"
                onClick={handleSort}
              >
                <span className="text-lg leading-none">↕</span> {sortOrder}
              </button>
            </div>
            <div className="flex flex-col">
              {devlogs.sort(sortDevlogs).map(log => (
                <Link
                  to={log.fields.slug}
                  className="group not-first:-mt-px first:rounded-t last:rounded-b p-4 transition-colors bg-card text-card-foreground border border-border hover:z-10 focus:z-10 hover:border-secondary"
                >
                  <div key={log.fields.slug}>
                    <small className="text-xs mb-2 text-muted-foreground font-mono">
                      {log.frontmatter.date}
                    </small>
                    <h3 className="text-lg mb-1.5 font-semibold group-hover:text-primary transition-colors">
                      {log.frontmatter.title}
                    </h3>
                    {log.frontmatter.excerpt && (
                      <p className="text-sm text-muted-foreground">
                        {log.frontmatter.excerpt}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {log.frontmatter.tech?.map(tech => (
                        <div className="px-2 rounded-lg mt-2.5 py-0.5 bg-primary/10 text-primary font-mono w-fit text-xs">
                          {tech}
                        </div>
                      ))}
                    </div>
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
          excerpt
          tech
        }
      }
    }
  }
`
