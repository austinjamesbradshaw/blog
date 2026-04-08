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
          social {
            github
            linkedin
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <header className="flex items-start gap-6 mb-8 px-4 border-b border-border pt-10 p-8 sm:px-0">
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
          <p className="font-mono text-primary text-sm mt-1">{author.title}</p>
          <p className="text-muted-foreground mt-3 text-sm whitespace-pre-line">
            The best things you've ever used had something in common: somewhere
            along the way, someone was thinking about{" "}
            <i className="font-bold">you</i>. I carry that same mindset into
            every product I engineer.
          </p>
          <p className="text-muted-foreground mt-3 text-sm whitespace-pre-line">
            I'm currently at{" "}
            <a
              className="underline hover:decoration-primary hover:text-primary decoration-[1.5px] decoration-muted-foreground/50 transition-all underline-offset-2"
              href="https://lockheedmartin.com/"
              target="_blank"
            >
              Lockheed Martin
            </a>{" "}
            building enterprise apps that empower employee experiences.
            Previously, I served as Founding Engineer of an offshore cost
            intelligence SaaS startup,{" "}
            <a
              className="underline hover:decoration-primary hover:text-primary decoration-[1.5px] decoration-muted-foreground/50 transition-all underline-offset-2"
              href="https://www.usebase.io/"
              target="_blank"
            >
              Base
            </a>
            .
          </p>
          <span className="text-muted-foreground font-mono mt-4 flex gap-8 text-xs justify-center sm:justify-start">
            <a
              href={social.github}
              target="_blank"
              className="hover:text-primary decoration-2 decoration-muted-foreground/50 transition-colors"
            >
              Github
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              className="hover:text-primary decoration-2 decoration-muted-foreground/50 transition-colors"
            >
              Linkedin
            </a>
          </span>
        </div>
      </div>
    </header>
  )
}

export default BioHeader
