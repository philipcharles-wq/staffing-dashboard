import { StatusTracker } from "@/components/status-tracker";
import { mapBackendStatusToStage } from "@/lib/api/projects";
import type { BackendProject } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

type ProjectCardProps = {
  project: BackendProject;
};

const stageDisplayHeadlines: Record<string, string> = {
  Received: "Intake Logged",
  "Under Review": "Review In Motion",
  "Leadership Locked": "Leadership Locked",
  "Team Build in Progress": "Team Build In Motion",
  "Awaiting Final Confirmation": "Final Confirmation Pending",
  "Team Confirmed": "Team Confirmed",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const staffingStage = mapBackendStatusToStage(project.status);
  const staffingOwner =
    project.mc_initials.length > 0 ? project.mc_initials.join(", ") : "Unassigned";
  const stageHeadline = stageDisplayHeadlines[staffingStage] ?? staffingStage;

  return (
    <article className="project-card">
      <div className="project-card-top">
        <p className="card-kicker">{project.id}</p>
        <span className="meta-chip subtle">{project.region}</span>
        <span className="project-card-updated">
          Updated {formatRelativeTime(project.last_updated)}
        </span>
      </div>

      <div className="project-card-hero">
        <h3 className="project-card-title">{project.name}</h3>
        <StatusTracker currentStage={staffingStage} headline={stageHeadline} />
      </div>

      <div className="project-card-footer">
        <span className="status-badge">{project.team}</span>
        <span className="project-card-note">Latest note: {project.comments}</span>
      </div>
    </article>
  );
}
