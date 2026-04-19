import { fetchProjectsForUser } from "@/lib/api/projects";

type DashboardProjectCountProps = {
  userInitials: string;
};

export async function DashboardProjectCount({
  userInitials,
}: DashboardProjectCountProps) {
  try {
    const projects = await fetchProjectsForUser(userInitials);

    return (
      <>
        <strong>{projects.length}</strong>
        <span className="hero-metric-footnote">Live backend data</span>
      </>
    );
  } catch {
    return (
      <>
        <strong>--</strong>
        <span className="hero-metric-footnote">Backend unavailable</span>
      </>
    );
  }
}
