import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import ExternalLink from "../components/ExternalLink"

const ProjectTemplate = ({ data, children, location }) => {
  const project = data.mdx
  const devlogs = data.allMdx.nodes

  const hasDevlogs = devlogs.length > 0

  const [sortOrder, setSortOrder] = React.useState("Newest First")
  const handleSort = () =>
    setSortOrder(prev =>
      prev === "Newest First" ? "Oldest First" : "Newest First",
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
        {project.frontmatter.hero?.childImageSharp && (
          <GatsbyImage
            image={project.frontmatter.hero.childImageSharp.gatsbyImageData}
            className="shadow-inner; mb-6 aspect-16/7 overflow-hidden rounded-xl"
          />
        )}

        <div className="mb-3.5 flex flex-col-reverse items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-8">
          <h1 className="text-3xl font-bold">{project.frontmatter.title}</h1>
          <span className="text-muted-foreground mb-2 flex justify-center gap-8 font-mono text-sm text-nowrap sm:justify-start">
            <ExternalLink href={project.frontmatter.demo} label="Live App" />
            <ExternalLink href={project.frontmatter.figma} label="Figma" />
          </span>
        </div>

        <div className="mb-12">{children}</div>

        {hasDevlogs && (
          <section>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
                Dev Log
              </h3>
              <button
                className="hover:text-primary text-muted-foreground cursor-pointer font-mono text-xs uppercase"
                onClick={handleSort}
              >
                <span className="text-lg leading-none">↕</span> {sortOrder}
              </button>
            </div>
            <div className="divide-border flex flex-col divide-y">
              {devlogs.sort(sortDevlogs).map(log => (
                <Link
                  to={log.fields.slug}
                  className="group py-4 transition-colors not-first:-mt-px first:rounded-t last:rounded-b hover:z-10 focus:z-10"
                >
                  <div key={log.fields.slug}>
                    <small className="text-muted-foreground mb-2 font-mono text-xs">
                      {log.frontmatter.date}
                    </small>
                    <h3 className="group-hover:text-primary mb-1.5 font-semibold transition-colors">
                      {log.frontmatter.title}
                    </h3>
                    {log.frontmatter.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {log.frontmatter.excerpt}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {log.frontmatter.tech?.map(tech => (
                        <div className="bg-primary/10 text-primary w-fit rounded-lg px-2 py-0.5 font-mono text-xs">
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
        demo
        figma
        tech
        hero {
          childImageSharp {
            gatsbyImageData(quality: 95, placeholder: BLURRED)
          }
        }
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
