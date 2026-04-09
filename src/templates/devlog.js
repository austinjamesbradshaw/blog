import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const DevlogTemplate = ({ data, children, pageContext, location }) => {
  const devlog = data.mdx

  return (
    <Layout
      location={location}
      projectName={pageContext.projectTitle}
      devlogTitle={devlog.frontmatter.title}
    >
      <div className="flex flex-1 flex-col justify-between">
        <article>{children}</article>
        <div className="flex w-full justify-between text-sm">
          <Link
            to={`/projects/${pageContext.projectSlug}/devlogs/${pageContext.prev?.slug}`}
            className={
              !pageContext.prev
                ? "group pointer-events-none flex flex-col opacity-50"
                : "group flex flex-col"
            }
          >
            <span className="text-muted-foreground font-mono text-xs uppercase">
              ← Previous
            </span>
            <span className="group-hover:text-primary font-medium transition-colors">
              {pageContext.prev?.title}
            </span>
          </Link>
          <Link
            to={`/projects/${pageContext.projectSlug}/devlogs/${pageContext.next?.slug}`}
            className={
              !pageContext.next
                ? "group pointer-events-none flex flex-col opacity-50"
                : "group flex flex-col"
            }
          >
            <span className="text-muted-foreground font-mono text-xs uppercase">
              Next →
            </span>
            <span className="group-hover:text-primary font-medium transition-colors">
              {pageContext.next?.title}
            </span>
          </Link>
        </div>
      </div>
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

export default DevlogTemplate

export const query = graphql`
  query DevlogPage($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
    }
  }
`
