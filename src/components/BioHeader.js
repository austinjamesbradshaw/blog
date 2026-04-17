import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import ExternalLink from "./ExternalLink"

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
        <div className="relative">
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
          <HowdyMessage />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-foreground text-2xl font-bold">{author.name}</h1>
          <p className="text-primary font-mono text-sm">{author.title}</p>
          <p className="mt-3 leading-relaxed whitespace-pre-line">
            The best things you've ever used had something in common: somewhere
            along the way, someone was thinking about{" "}
            <i className="font-bold">you</i>. I carry that same mindset into
            every product I engineer.
          </p>
          <p className="mt-3 leading-relaxed whitespace-pre-line">
            I'm currently at{" "}
            <a
              className="text-primary no-underline decoration-[1.5px] underline-offset-2 transition-all hover:underline active:opacity-80"
              href="https://lockheedmartin.com/"
              target="_blank"
            >
              Lockheed Martin
            </a>{" "}
            building enterprise apps that empower employee experiences.
            Previously, I served as Founding Engineer of{" "}
            <a
              className="text-primary no-underline decoration-[1.5px] underline-offset-2 transition-all hover:underline active:opacity-80"
              href="https://www.usebase.io/"
              target="_blank"
            >
              Base
            </a>
            , an offshore cost intelligence SaaS startup.
          </p>
          <span className="text-muted-foreground mt-4 flex justify-center gap-8 font-mono text-sm sm:justify-start">
            <ExternalLink href={social.linkedin} label="LinkedIn" />
            <ExternalLink href={social.github} label="GitHub" />
          </span>
        </div>
      </div>
    </header>
  )
}

export default BioHeader

function HowdyMessage() {
  const Message = () => {
    if (process.env.GATSBY_WELCOME_MESSAGE) {
      return process.env.GATSBY_WELCOME_MESSAGE
    }
    if (process.env.GATSBY_WELCOME_IMG) {
      return (
        <span className="flex items-center">
          {"Howdy,"}
          <img
            className="ml-1 size-4 shrink-0"
            src={process.env.GATSBY_WELCOME_IMG}
          />
          {"!"}
        </span>
      )
    }
    return "Howdy!"
  }

  return (
    <div className="animate-in ease-bubble fade-in zoom-in fill-mode-backwards after:border-border absolute top-12 right-22 z-10 origin-bottom-right rounded-xl border bg-white px-2 py-0.5 text-[13px] text-nowrap shadow-md delay-1000 duration-500 after:absolute after:right-1 after:-bottom-0.75 after:-z-10 after:block after:h-1.5 after:w-3 after:rotate-10 after:skew-12 after:border-r after:border-b after:bg-white after:content-['']">
      <Message />
    </div>
  )
}
