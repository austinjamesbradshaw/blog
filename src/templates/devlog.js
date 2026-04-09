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
      <div className="flex flex-1 justify-between flex-col">
        <article>{children}</article>
        <div className="w-full justify-between flex text-sm">
          <Link
            to={`/projects/${pageContext.projectSlug}/devlogs/${pageContext.prev?.slug}`}
            className={
              !pageContext.prev
                ? "group opacity-50 pointer-events-none flex flex-col"
                : "group flex flex-col"
            }
          >
            <span className="font-mono text-muted-foreground uppercase text-xs">
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
                ? "group opacity-50 pointer-events-none flex flex-col"
                : "group flex flex-col"
            }
          >
            <span className="font-mono text-muted-foreground uppercase text-xs">
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
