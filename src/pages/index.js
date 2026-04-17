import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ChevronRight } from "lucide-react"

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
              className="group hover:border-secondary text-card-foreground border-border bg-card rounded-lg border p-4 transition-colors"
            >
              <article
                itemScope
                itemType="http://schema.org/Article"
                className="flex gap-4 sm:flex-row sm:gap-4"
              >
                <div>
                  <div className="mb-1.5 flex w-full items-center justify-between">
                    <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
                      {project.frontmatter.thumbnail ? (
                        <GatsbyImage
                          image={getImage(project.frontmatter.thumbnail)}
                          alt={`${project.frontmatter.title} thumbnail`}
                          className="mt-1 mr-2 size-5 shrink-0 rounded-md"
                        />
                      ) : (
                        <div className="bg-secondary/50 gatsby-image-wrapper gatsby-image-wrapper-constrained mt-1 mr-2 size-5 shrink-0 rounded-md" />
                      )}
                      <span itemProp="headline">{title}</span>
                    </h3>
                    <ChevronRight className="text-muted-foreground group-hover:text-primary size-4 transition-all group-hover:translate-x-0.5" />
                  </div>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        project.frontmatter.description || project.excerpt,
                    }}
                    itemProp="description"
                  />
                  {project.frontmatter.skills && (
                    <div className="flex flex-wrap gap-2">
                      {project.frontmatter.skills.map(skill => (
                        <div className="bg-primary/10 text-primary mt-2.5 w-fit rounded-lg px-2 py-0.5 font-mono text-xs">
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
      sort: { frontmatter: { dateLaunched: ASC } }
    ) {
      nodes {
        excerpt(pruneLength: 160)
        fields {
          slug
          projectSlug
        }
        frontmatter {
          title
          dateLaunched(formatString: "MMMM DD, YYYY")
          description
          skills
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 104
                height: 104
                quality: 95
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`
