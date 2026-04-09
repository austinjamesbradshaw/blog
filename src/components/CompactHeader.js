import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const CompactHeader = ({ location, projectName, devlogTitle }) => {
  const data = useStaticQuery(graphql`
    query CompactHeaderQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  const pathnameParts = location.pathname.split("/")
  const projectPathname = `/${pathnameParts[1]}/${pathnameParts[2]}`

  const author = data.site.siteMetadata?.author

  const isDevlog = !!devlogTitle

  return (
    <header className="border-border mb-8 flex items-center gap-3 border-b pt-10 pb-6">
      <Link to="/" className="group flex min-w-0 items-center gap-3">
        <StaticImage
          className="h-9 w-9 flex-shrink-0 rounded-lg object-cover"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={36}
          height={36}
          quality={95}
          alt={author.name}
        />
        <span className="text-muted-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
          {author.name}
        </span>
      </Link>
      <span className="text-border font-mono text-xs">/</span>
      {!isDevlog && (
        <span className="text-foreground truncate text-sm font-semibold">
          {projectName}
        </span>
      )}
      {isDevlog && (
        <>
          <Link
            to={projectPathname}
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="text-muted-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
              {projectName}
            </span>
          </Link>
          <span className="text-border font-mono text-xs">/</span>
          <span className="text-foreground truncate text-sm font-semibold">
            {devlogTitle}
          </span>
        </>
      )}
    </header>
  )
}

export default CompactHeader
