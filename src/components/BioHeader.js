import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const BioHeader = () => {
  const data = useStaticQuery(graphql`
    query BioHeaderQuery {
      site {
        siteMetadata {
          author {
            name
            title
            summary
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author

  return (
    <header className="flex items-start gap-6 mb-10 p-8 lg:p-0 lg:pb-8 border-b border-border pt-10 lg:pt-16 ">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-2xl">
        <StaticImage
          className="w-14 h-14 rounded-full object-cover"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={96}
          height={96}
          quality={95}
          alt={author.name}
        />
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground">{author.name}</h1>
          <p className="font-mono text-primary mt-1">{author.title}</p>
          <p className="text-muted-foreground mt-3 whitespace-pre-line">
            The best things you've ever used had something in common: somewhere
            along the way, someone was thinking about{" "}
            <i className="font-bold">you</i>. I hold this standard close on the
            products I engineer.
          </p>
          <p className="text-muted-foreground mt-3 whitespace-pre-line">
            I'm currently at Lockheed Martin building enterprise applications
            that empower employee experiences. Previously, I served as Founding
            Engineer of global SaaS, "Base".
          </p>
        </div>
      </div>
    </header>
  )
}

export default BioHeader
