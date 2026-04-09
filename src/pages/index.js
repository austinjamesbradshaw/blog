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
      <h2 className="text-muted-foreground mb-4 font-mono text-sm tracking-wider uppercase">
        Things I've made
      </h2>
      <div className="flex flex-col gap-4">
        {projects.map(project => {
          const title = project.frontmatter.title || project.fields.slug

          return (
            <Link
              key={project.fields.slug}
              to={project.fields.slug}
              itemProp="url"
              className="group hover:border-secondary bg-card text-card-foreground border-border rounded border p-4 transition-colors"
            >
              <article
                itemScope
                itemType="http://schema.org/Article"
                className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6"
              >
                <div>
                  <h3 className="group-hover:text-primary mb-1.5 text-lg font-semibold transition-colors">
                    <span itemProp="headline">{title}</span>
                  </h3>
                  <p
                    className="text-muted-foreground text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        project.frontmatter.description || project.excerpt,
                    }}
                    itemProp="description"
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.frontmatter.tech.map(tech => (
                      <div className="bg-primary/10 text-primary mt-2.5 w-fit rounded-lg px-2 py-0.5 font-mono text-xs">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary/50 size-18 shrink-0 rounded-md sm:size-26" />
              </article>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo title={"Home"} />

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
