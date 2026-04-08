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
      <h2 className="text-muted-foreground text-sm tracking-wider mb-4 font-mono uppercase">
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
              className="group hover:shadow active:shadow-xs p-4 transition-shadow rounded bg-card text-card-foreground border border-border"
            >
              <article
                itemScope
                itemType="http://schema.org/Article"
                className="gap-4 sm:gap-6 flex flex-col-reverse sm:flex-row"
              >
                <div>
                  <h3 className="text-lg mb-1.5 font-semibold group-hover:text-primary">
                    <span itemProp="headline">{title}</span>
                  </h3>
                  <p
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html:
                        project.frontmatter.description || project.excerpt,
                    }}
                    itemProp="description"
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.frontmatter.tech.map(tech => (
                      <div className="px-2 rounded-lg mt-2.5 py-0.5 bg-primary/10 text-primary font-mono w-fit text-xs">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="size-18 sm:size-26 bg-secondary/50 rounded-md shrink-0" />
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
