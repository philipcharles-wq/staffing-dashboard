import { ProjectCard } from "@/components/project-card";
import { fetchProjectsForUser } from "@/lib/api/projects";

type DashboardProjectsGridProps = {
  userInitials: string;
};

export async function DashboardProjectsGrid({
  userInitials,
}: DashboardProjectsGridProps) {
  try {
    const projects = await fetchProjectsForUser(userInitials);

    if (projects.length === 0) {
      return (
        <div className="state-panel">
          <h3>No projects found</h3>
          <p className="body-copy">
            No staffing records were returned for {userInitials}. When projects
            are assigned, they will appear here automatically.
          </p>
        </div>
      );
    }

    return (
      <div className="card-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The staffing service could not be reached.";

    return (
      <div className="state-panel state-panel-error">
        <h3>Unable to load projects</h3>
        <p className="body-copy">
          The dashboard could not retrieve live staffing data from the FastAPI
          backend. {message}
        </p>
      </div>
    );
  }
}
