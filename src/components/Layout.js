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
    <div className="bg-background flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 sm:px-6">
        <header className="global-header">{header}</header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="border-border text-muted-foreground mt-10 border-t py-4 text-center text-sm">
          © {new Date().getFullYear()} Austin Bradshaw
        </footer>
      </div>
    </div>
  )
}

export default Layout
