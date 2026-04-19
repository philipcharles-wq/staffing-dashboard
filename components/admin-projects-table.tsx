import Link from "next/link";
import type { BackendAdminProject } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

type AdminProjectsTableProps = {
  projects: BackendAdminProject[];
};

export function AdminProjectsTable({ projects }: AdminProjectsTableProps) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Requested Code</th>
            <th>Region</th>
            <th>Current Stage</th>
            <th>Sub-status</th>
            <th>Updated</th>
            <th>Staffing Owner</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href={`/projects/${project.id}`} className="text-link">
                  {project.name}
                </Link>
              </td>
              <td>{project.id}</td>
              <td>{project.region}</td>
              <td>{project.status}</td>
              <td>{project.sub_status}</td>
              <td>{formatRelativeTime(project.last_updated)}</td>
              <td>
                {project.mc_initials.length > 0
                  ? project.mc_initials.join(", ")
                  : "\u2014"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
