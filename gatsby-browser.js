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
  h2: props => <h2 className="text-2xl font-bold mb-4" {...props} />,
  p: props => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props} />
  ),
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
