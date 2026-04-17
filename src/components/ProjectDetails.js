import * as React from "react"
import { Zap, Trophy, Activity, Rocket, Code2 } from "lucide-react"

const ProjectDetails = ({ skills, outcomes, dateLaunched }) => {
  return (
    <div className="mb-6">
      <div className="divide-border divide-y">
        <div className="grid grid-rows-[18px_1fr] gap-2 py-4 sm:grid-cols-[160px_1fr] sm:grid-rows-1 sm:gap-4 sm:py-2.5">
          <span className="text-muted-foreground flex items-start gap-1.5 pt-0.5 font-mono text-xs tracking-wider uppercase">
            <Activity className="size-3.5" /> Status
          </span>
          {dateLaunched && (
            <div className="flex items-center gap-2 text-sm">
              <Rocket className="size-3.5" /> {dateLaunched}
            </div>
          )}
          {!dateLaunched && (
            <div className="flex items-center gap-2 text-sm">
              <Code2 className="size-3.5" />
              In Development
            </div>
          )}
        </div>
        <div className="grid grid-rows-[18px_1fr] gap-2 py-4 sm:grid-cols-[160px_1fr] sm:grid-rows-1 sm:gap-4 sm:py-2.5">
          <span className="text-muted-foreground flex items-start gap-1.5 pt-0.5 font-mono text-xs tracking-wider uppercase">
            <Zap className="size-3.5" /> Skills
          </span>
          <div className="text-primary text-sm">
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <div
                  key={skill}
                  className="bg-primary/10 w-fit rounded-lg px-2 py-0.5 font-mono text-xs"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        {outcomes && (
          <div className="grid grid-rows-[18px_1fr] gap-2 py-4 sm:grid-cols-[160px_1fr] sm:grid-rows-1 sm:gap-4 sm:py-2.5">
            <span className="text-muted-foreground flex h-fit items-start gap-1.5 pt-0.5 font-mono text-xs tracking-wider uppercase">
              <Trophy className="size-3.5" /> Key Outcomes
            </span>
            <div className="text-sm leading-relaxed">
              <ul className="list-disc space-y-1 pl-3.5">
                {outcomes.map(outcome => (
                  <li
                    key={outcome}
                    className="text-pretty"
                    dangerouslySetInnerHTML={{ __html: outcome }}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
