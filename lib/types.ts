export const staffingStages = [
  "Received",
  "Under Review",
  "Leadership Locked",
  "Team Build in Progress",
  "Awaiting Final Confirmation",
  "Team Confirmed",
] as const;

export type StaffingStage = (typeof staffingStages)[number];

export type Region = "North America" | "Europe" | "Middle East" | "APAC";

export type TimelineEntry = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  requestedProjectCode: string;
  region: Region;
  currentStage: StaffingStage;
  subStatus: string;
  lastUpdated: string;
  staffingOwner: string;
  staffingComments: string;
  projectComments: string;
  timeline: TimelineEntry[];
};

export type BackendProject = {
  id: string;
  name: string;
  region: string;
  mc_initials: string[];
  status: string;
  team: string;
  comments: string;
  last_updated: string;
};

export type BackendAdminProject = {
  id: string;
  name: string;
  region: string;
  mc_initials: string[];
  status: string;
  sub_status: string;
  comments: string;
  last_updated: string;
};
