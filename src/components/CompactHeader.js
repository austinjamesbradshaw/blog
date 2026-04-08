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
    <header className="flex items-center gap-3 mb-8 pb-6 border-b border-border pt-10">
      <Link to="/" className="flex items-center gap-3 group min-w-0">
        <StaticImage
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={36}
          height={36}
          quality={95}
          alt={author.name}
        />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors truncate">
          {author.name}
        </span>
      </Link>
      <span className="text-border font-mono text-xs">/</span>
      {!isDevlog && (
        <span className="text-sm font-semibold text-foreground truncate">
          {projectName}
        </span>
      )}
      {isDevlog && (
        <>
          <Link
            to={projectPathname}
            className="flex items-center gap-3 group min-w-0"
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors truncate">
              {projectName}
            </span>
          </Link>
          <span className="text-border font-mono text-xs">/</span>
          <span className="text-sm font-semibold text-foreground truncate">
            {devlogTitle}
          </span>
        </>
      )}
    </header>
  )
}

export default CompactHeader
