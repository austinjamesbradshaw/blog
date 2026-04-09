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
    <header className="border-border mb-8 flex items-start gap-6 border-b p-8 px-2 pt-10 sm:px-0">
      <div className="flex max-w-2xl flex-col items-center gap-6 sm:flex-row sm:items-start">
        <StaticImage
          className="rounded-xl object-cover"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={128}
          height={128}
          quality={95}
          alt={author.name}
        />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-foreground text-2xl font-bold">{author.name}</h1>
          <p className="text-primary mt-1 font-mono text-sm">{author.title}</p>
          <p className="text-muted-foreground mt-3 leading-relaxed whitespace-pre-line">
            The best things you've ever used had something in common: somewhere
            along the way, someone was thinking about{" "}
            <i className="font-bold">you</i>. I carry that same mindset into
            every product I engineer.
          </p>
          <p className="text-muted-foreground mt-3 leading-relaxed whitespace-pre-line">
            I'm currently at{" "}
            <a
              className="hover:decoration-primary hover:text-primary decoration-muted-foreground/50 underline decoration-[1.5px] underline-offset-2 transition-all"
              href="https://lockheedmartin.com/"
              target="_blank"
            >
              Lockheed Martin
            </a>{" "}
            building enterprise apps that empower employee experiences.
            Previously, I served as Founding Engineer of{" "}
            <a
              className="hover:decoration-primary hover:text-primary decoration-muted-foreground/50 underline decoration-[1.5px] underline-offset-2 transition-all"
              href="https://www.usebase.io/"
              target="_blank"
            >
              Base
            </a>
            , an offshore cost intelligence SaaS startup.
          </p>
          <span className="text-muted-foreground mt-4 flex justify-center gap-8 font-mono text-sm sm:justify-start">
            <a
              href={social.github}
              target="_blank"
              className="group hover:text-primary decoration-muted-foreground/50 flex gap-1 decoration-2 transition-colors"
            >
              <span className="mt-px">GitHub</span>
              <span className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px">
                ↗
              </span>
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              className="group hover:text-primary decoration-muted-foreground/50 flex gap-1 decoration-2 transition-colors"
            >
              <span className="mt-px">LinkedIn</span>
              <span className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px">
                ↗
              </span>
            </a>
          </span>
        </div>
      </div>
    </header>
  )
}

export default BioHeader
