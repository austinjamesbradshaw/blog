import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { FileQuestion } from "lucide-react"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout
      location={location}
      title={siteTitle}
      projectName={"Page Not Found"}
    >
      <div className="flex flex-1 items-center justify-center">
        <span className="flex h-fit w-fit items-center gap-2">
          <FileQuestion className="size-7" />
          <h1 className="text-3xl">Page Not Found</h1>
        </span>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Page Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
