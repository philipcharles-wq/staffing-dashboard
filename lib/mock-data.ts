import type { Project } from "@/lib/types";
import { staffingStages } from "@/lib/types";

export { staffingStages };

export const projects: Project[] = [
  {
    id: "aurora-growth",
    name: "Aurora Growth Strategy",
    requestedProjectCode: "REQ-24017",
    region: "Europe",
    currentStage: "Under Review",
    subStatus: "Partner demand calibrated",
    lastUpdated: "2026-04-17T08:30:00.000Z",
    staffingOwner: "Emily Carter",
    staffingComments:
      "Two manager profiles are under active review while local language coverage is confirmed for the core workstream.",
    projectComments:
      "Client kickoff date remains fixed for the final week of April, so staffing confirmation needs to hold against that milestone.",
    timeline: [
      {
        id: "aurora-1",
        timestamp: "2026-04-15T09:00:00.000Z",
        title: "Request received",
        description:
          "Initial staffing request logged with an eight-week duration and central strategy scope.",
      },
      {
        id: "aurora-2",
        timestamp: "2026-04-16T14:15:00.000Z",
        title: "Review started",
        description:
          "Regional leadership reviewed profile mix and requested manager-level flexibility across two workstreams.",
      },
      {
        id: "aurora-3",
        timestamp: "2026-04-17T08:30:00.000Z",
        title: "Demand calibrated",
        description:
          "Commercial assumptions aligned and project team shape refined ahead of leadership lock.",
      },
    ],
  },
  {
    id: "meridian-dd",
    name: "Meridian Commercial Diligence",
    requestedProjectCode: "REQ-24021",
    region: "North America",
    currentStage: "Leadership Locked",
    subStatus: "Director slate approved",
    lastUpdated: "2026-04-16T19:10:00.000Z",
    staffingOwner: "Jordan Lee",
    staffingComments:
      "Leadership team has aligned on the top-of-pyramid structure and the case team build is moving to consultant matching.",
    projectComments:
      "Client timing is slightly fluid, but the buyer group wants near-immediate mobilization once diligence starts.",
    timeline: [
      {
        id: "meridian-1",
        timestamp: "2026-04-12T11:45:00.000Z",
        title: "Request received",
        description:
          "Diligence ask submitted with accelerated turnaround and sector specialist requirements.",
      },
      {
        id: "meridian-2",
        timestamp: "2026-04-14T10:20:00.000Z",
        title: "Under review",
        description:
          "Operations validated timing and flagged capacity concentration risk in the North America pool.",
      },
      {
        id: "meridian-3",
        timestamp: "2026-04-16T19:10:00.000Z",
        title: "Leadership locked",
        description:
          "Partner and director assignments confirmed, enabling broader team build to proceed.",
      },
    ],
  },
  {
    id: "horizon-transformation",
    name: "Horizon Cost Transformation",
    requestedProjectCode: "REQ-24028",
    region: "Middle East",
    currentStage: "Team Build in Progress",
    subStatus: "Consultant interviews underway",
    lastUpdated: "2026-04-17T06:50:00.000Z",
    staffingOwner: "Sana Rahman",
    staffingComments:
      "Three consultant options have strong availability; one subject-matter expert remains pending due to travel overlap.",
    projectComments:
      "The client requested a blended regional and global team, so mobility and visa timing are being tracked closely.",
    timeline: [
      {
        id: "horizon-1",
        timestamp: "2026-04-11T08:30:00.000Z",
        title: "Request received",
        description:
          "Transformation request opened with broad operating model scope and six-month duration.",
      },
      {
        id: "horizon-2",
        timestamp: "2026-04-13T17:00:00.000Z",
        title: "Leadership locked",
        description:
          "Case leadership confirmed and staffing focus shifted to consultant and expert layer assembly.",
      },
      {
        id: "horizon-3",
        timestamp: "2026-04-17T06:50:00.000Z",
        title: "Interviews underway",
        description:
          "Candidate conversations scheduled with emphasis on client-facing transformation delivery experience.",
      },
    ],
  },
  {
    id: "atlas-market-entry",
    name: "Atlas Market Entry",
    requestedProjectCode: "REQ-24031",
    region: "APAC",
    currentStage: "Awaiting Final Confirmation",
    subStatus: "Client confirmation pending",
    lastUpdated: "2026-04-17T07:40:00.000Z",
    staffingOwner: "Marcus Tan",
    staffingComments:
      "Preferred team is assembled and available; final confirmation depends on one client-side timing checkpoint this afternoon.",
    projectComments:
      "Project scope is stable and start date is expected to hold if the client confirms budget release as planned.",
    timeline: [
      {
        id: "atlas-1",
        timestamp: "2026-04-10T13:10:00.000Z",
        title: "Request received",
        description:
          "Market entry request registered with regional growth and pricing workstreams.",
      },
      {
        id: "atlas-2",
        timestamp: "2026-04-15T15:40:00.000Z",
        title: "Team build completed",
        description:
          "Proposed team validated internally and moved forward for final client-side confirmation.",
      },
      {
        id: "atlas-3",
        timestamp: "2026-04-17T07:40:00.000Z",
        title: "Awaiting confirmation",
        description:
          "Client response expected later today following internal procurement sign-off.",
      },
    ],
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
