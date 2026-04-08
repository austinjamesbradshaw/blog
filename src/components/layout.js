import * as React from "react"
import CompactHeader from "./CompactHeader"
import BioHeader from "./BioHeader"

const Layout = ({ location, projectName, devlogTitle, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = <BioHeader />
  } else {
    header = (
      <CompactHeader
        location={location}
        projectName={projectName}
        devlogTitle={devlogTitle}
      />
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-col max-w-2xl w-full flex-1 mx-auto px-4 sm:px-6">
        <header className="global-header">{header}</header>
        <main className="flex flex-col flex-1">{children}</main>
        <footer className="mt-10 py-4 border-t border-border text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Austin Bradshaw
        </footer>
      </div>
    </div>
  )
}

export default Layout
