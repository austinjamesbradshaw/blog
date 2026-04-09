/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    if (!parent) return

    const relativePath = parent.relativePath || ""
    const relativeDirectory = parent.relativeDirectory || ""

    const projectSlug =
      relativeDirectory.split("/")[0] || parent.name || "unknown"

    createNodeField({
      node,
      name: "projectSlug",
      value: projectSlug,
    })

    createNodeField({
      node,
      name: "isProjectOverview",
      value: parent.name === "index" || relativePath.endsWith("index.mdx"),
    })

    createNodeField({
      node,
      name: "isDevlog",
      value: relativeDirectory.includes("devlogs"),
    })

    let slug = ""
    if (relativeDirectory.includes("devlogs")) {
      const devlogSlug = parent.name
      createNodeField({
        node,
        name: "devlogSlug",
        value: devlogSlug,
      })
      slug = `/projects/${projectSlug}/devlogs/${devlogSlug}/`
    } else {
      slug = `/projects/${projectSlug}/`
    }

    if (!slug || slug === "/") {
      slug = `/projects/${projectSlug}/`
    }

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(
        filter: { fields: { projectSlug: { ne: null } } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          id
          fields {
            projectSlug
            devlogSlug
            isProjectOverview
            isDevlog
          }
          frontmatter {
            title
            date
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  const allNodes = result.data.allMdx.nodes

  const projectOverviews = allNodes.filter(
    node => node.fields.isProjectOverview,
  )

  projectOverviews.forEach(overview => {
    const projectSlug = overview.fields.projectSlug

    createPage({
      path: `/projects/${projectSlug}`,
      component: `${require.resolve(
        `./src/templates/project.js`,
      )}?__contentFilePath=${overview.internal.contentFilePath}`,
      context: {
        id: overview.id,
        projectSlug,
      },
    })
  })

  const devlogs = allNodes.filter(node => node.fields.isDevlog)

  const devlogsByProject = {}
  devlogs.forEach(log => {
    const project = log.fields.projectSlug
    if (!devlogsByProject[project]) {
      devlogsByProject[project] = []
    }
    devlogsByProject[project].push(log)
  })

  const projectTitles = {}
  projectOverviews.forEach(overview => {
    projectTitles[overview.fields.projectSlug] = overview.frontmatter.title
  })

  Object.keys(devlogsByProject).forEach(projectSlug => {
    const projectDevlogs = devlogsByProject[projectSlug]
    const projectTitle = projectTitles[projectSlug] || projectSlug // fallback

    projectDevlogs.forEach((currentLog, index) => {
      const prevLog = index > 0 ? projectDevlogs[index - 1] : null
      const nextLog =
        index < projectDevlogs.length - 1 ? projectDevlogs[index + 1] : null

      createPage({
        path: `/projects/${projectSlug}/devlogs/${currentLog.fields.devlogSlug}`,
        component: `${require.resolve(
          `./src/templates/devlog.js`,
        )}?__contentFilePath=${currentLog.internal.contentFilePath}`,
        context: {
          id: currentLog.id,
          projectSlug,
          projectTitle,
          prev: prevLog
            ? {
                slug: prevLog.fields.devlogSlug,
                title: prevLog.frontmatter.title,
                date: prevLog.frontmatter.date,
              }
            : null,
          next: nextLog
            ? {
                slug: nextLog.fields.devlogSlug,
                title: nextLog.frontmatter.title,
                date: nextLog.frontmatter.date,
              }
            : null,
        },
      })
    })
  })
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MdxFields {
      slug: String
      projectSlug: String
      devlogSlug: String
      isProjectOverview: Boolean!
      isDevlog: Boolean!
    }

    type MdxFrontmatter {
      title: String!
      date: Date @dateformat
      description: String
      tech: [String!]
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
      description: String
    }
  `)
}
