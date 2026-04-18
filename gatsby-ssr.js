/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}

const { wrapRootElement } = require("./gatsby-browser")
exports.wrapRootElement = wrapRootElement
