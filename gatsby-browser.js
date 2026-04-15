// custom typefaces
import "@fontsource/space-grotesk/300.css" // Light
import "@fontsource/space-grotesk/400.css" // Regular
import "@fontsource/space-grotesk/500.css" // Medium
import "@fontsource/space-grotesk/600.css" // Semi-Bold
import "@fontsource/space-grotesk/700.css" // Bold

import "@fontsource/merriweather/300.css" // Light
import "@fontsource/merriweather/400.css" // Regular
import "@fontsource/merriweather/500.css" // Medium
import "@fontsource/merriweather/600.css" // Semi-Bold
import "@fontsource/merriweather/700.css" // Bold

import "@fontsource/fira-code/300.css" // Light
import "@fontsource/fira-code/400.css" // Regular
import "@fontsource/fira-code/500.css" // Medium
import "@fontsource/fira-code/600.css" // Semi-Bold
import "@fontsource/fira-code/700.css" // Bold

// custom CSS styles
import "./src/global.css"

// Highlighting for code blocks
import "./src/codeblock.css"
import "prism-themes/themes/prism-cb.css"

import * as React from "react"
import { MDXProvider } from "@mdx-js/react"

export function MdxLink(props) {
  return (
    <a
      className="text-primary no-underline decoration-[1.5px] underline-offset-2 transition-all hover:underline active:opacity-80"
      {...props}
    />
  )
}

const components = {
  h1: props => <h1 className="text-3xl font-bold" {...props} />,
  h2: props => <h2 className="mt-8 mb-3 text-xl font-bold" {...props} />,
  h3: props => <h3 className="mt-8 mb-1 text-lg font-semibold" {...props} />,
  p: props => <p className="mb-4 leading-relaxed text-pretty" {...props} />,
  ol: props => (
    <ol
      className="mb-4 list-decimal pl-8 leading-relaxed [&>li]:mb-2"
      {...props}
    />
  ),
  ul: props => (
    <ul
      className="mb-4 list-disc pl-8 leading-relaxed [&>li]:mb-2"
      {...props}
    />
  ),
  a: props => <MdxLink {...props} />,
  hr: props => <hr className="my-4" {...props} />,
  img: props => <img {...props} className="mb-8 rounded-xl" />,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
