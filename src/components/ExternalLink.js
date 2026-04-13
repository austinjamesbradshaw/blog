import * as React from "react"

export default function ExternalLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      className="group hover:text-primary decoration-muted-foreground/50 flex gap-1 decoration-2 transition-colors"
    >
      <span className="mt-px">{label}</span>
      <span className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px">
        ↗
      </span>
    </a>
  )
}
