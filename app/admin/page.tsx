import Link from "next/link";
import { WarningBanner } from "@/components/warning-banner";
import { AdminProjectsTable } from "@/components/admin-projects-table";
import { fetchAllProjects } from "../../lib/api";

export default async function AdminPage() {
  const projects = await fetchAllProjects();

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h2 className="hero-title-display">All Projects</h2>
          <p className="hero-copy">
            Portfolio-wide staffing visibility for operations and leadership.
          </p>
        </div>
        <div className="hero-metric-card">
          <span className="hero-metric-label">Projects</span>
          <strong>{projects.length}</strong>
          <span className="hero-metric-footnote">Live backend data</span>
        </div>
      </section>

      <WarningBanner message="STAFFING STATUS MAY CHANGE AT ANY TIME!" />

      <section className="panel">
        <div className="panel-header">
          <h3>Project Register</h3>
          <span className="panel-muted">{projects.length} live projects</span>
        </div>
        <AdminProjectsTable projects={projects} />
      </section>

      <Link href="/" className="button-link">
        Return to partner dashboard
      </Link>
    </div>
  );
}