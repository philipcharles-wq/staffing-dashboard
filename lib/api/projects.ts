import type { BackendProject, StaffingStage } from "@/lib/types";

const PROJECTS_ENDPOINT = "http://127.0.0.1:8000/projects";

export async function fetchProjectsForUser(
  userInitials: string,
): Promise<BackendProject[]> {
  const searchParams = new URLSearchParams({ user_initials: userInitials });
  const response = await fetch(`${PROJECTS_ENDPOINT}?${searchParams.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Projects request failed with status ${response.status}`);
  }

  return (await response.json()) as BackendProject[];
}
export async function fetchAllProjects(): Promise<BackendProject[]> {
  const response = await fetch("http://127.0.0.1:8000/admin/projects", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Admin projects request failed with status ${response.status}`);
  }

  return (await response.json()) as BackendProject[];
}
export function mapBackendStatusToStage(status: string): StaffingStage {
  const normalizedStatus = status.trim().toLowerCase();

  if (normalizedStatus.includes("received")) {
    return "Received";
  }

  if (normalizedStatus.includes("review")) {
    return "Under Review";
  }

  if (normalizedStatus.includes("leadership")) {
    return "Leadership Locked";
  }

  if (normalizedStatus.includes("build") || normalizedStatus.includes("staff")) {
    return "Team Build in Progress";
  }

  if (
    normalizedStatus.includes("final") ||
    normalizedStatus.includes("confirm")
  ) {
    return "Awaiting Final Confirmation";
  }

  if (
    normalizedStatus.includes("confirmed") ||
    normalizedStatus.includes("complete")
  ) {
    return "Team Confirmed";
  }

  return "Under Review";
}
