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

const components = {
  h1: props => <h1 className="text-3xl font-bold" {...props} />,
  h2: props => <h2 className="mt-8 mb-3 text-xl font-bold" {...props} />,
  p: props => (
    <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
  ),
  hr: props => <hr className="my-4" {...props} />,
  picture: props => <picture {...props} className="rounded-xl" />,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
