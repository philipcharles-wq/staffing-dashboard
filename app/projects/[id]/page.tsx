import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusTracker } from "@/components/status-tracker";
import { Timeline } from "@/components/timeline";
import { getProjectById } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-stack">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Project Detail</p>
          <h2>{project.name}</h2>
          <p className="hero-copy">
            Requested Project Code {project.requestedProjectCode}
          </p>
        </div>
        <Link href="/" className="subtle-link">
          Back to My Projects
        </Link>
      </div>

      <section className="detail-grid">
        <article className="panel">
          <div className="panel-header">
            <h3>Project Metadata</h3>
            <span className="meta-chip">{project.region}</span>
          </div>
          <dl className="metadata-grid">
            <div>
              <dt>Staffing owner</dt>
              <dd>{project.staffingOwner}</dd>
            </div>
            <div>
              <dt>Current stage</dt>
              <dd>{project.currentStage}</dd>
            </div>
            <div>
              <dt>Sub-status</dt>
              <dd>{project.subStatus}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>{formatDateTime(project.lastUpdated)}</dd>
            </div>
          </dl>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Staffing Comments</h3>
          </div>
          <p className="body-copy">{project.staffingComments}</p>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Project Comments</h3>
          </div>
          <p className="body-copy">{project.projectComments}</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Status Tracker</h3>
          <span className="meta-chip">{project.currentStage}</span>
        </div>
        <p className="section-copy">
          Current sub-status: <strong>{project.subStatus}</strong>
        </p>
        <StatusTracker currentStage={project.currentStage} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Historical Updates</h3>
          <span className="panel-muted">
            {project.timeline.length} events recorded
          </span>
        </div>
        <Timeline items={project.timeline} />
      </section>
    </div>
  );
}
