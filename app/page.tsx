import { Suspense } from "react";
import { DashboardProjectCount } from "@/components/dashboard-project-count";
import { DashboardProjectsGrid } from "@/components/dashboard-projects-grid";
import { DashboardProjectsLoading } from "@/components/dashboard-projects-loading";
import { BubbleWrapLayer } from "@/components/bubble-wrap-layer";
import { PartnerSelector } from "@/components/partner-selector";
import { WarningBanner } from "@/components/warning-banner";

type DashboardPageProps = {
  searchParams: Promise<{ viewer?: string }>;
};

const supportedPartners = new Set(["PHB", "AEMA"]);

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const resolvedSearchParams = await searchParams;

  const selectedViewer = supportedPartners.has(resolvedSearchParams.viewer ?? "")
    ? (resolvedSearchParams.viewer as "PHB" | "AEMA")
    : "PHB";

  return (
    <div className="dashboard-surface">
      <BubbleWrapLayer />

      <div className="shell">
        <div className="page-stack dashboard-content">

          <section className="hero">
            <div>
              <p className="eyebrow">Partner Dashboard</p>

              <h2 className="hero-title-display">
                Cooking up the Magic
              </h2>

              <p className="hero-copy">
                Track staffing progress across active client work so you need not bother the staffing team!
              </p>

              <div className="viewer-row">
                <PartnerSelector value={selectedViewer} />
              </div>
            </div>

            <div className="hero-metric-card">
              <span className="hero-metric-label">Open projects</span>

              <Suspense
                fallback={
                  <>
                    <strong>...</strong>
                    <span className="hero-metric-footnote">
                      Loading live data
                    </span>
                  </>
                }
              >
                <DashboardProjectCount userInitials={selectedViewer} />
              </Suspense>
            </div>
          </section>

          <WarningBanner message="Staffing status may change at any time." />

          <section className="dashboard-grid">
            <Suspense fallback={<DashboardProjectsLoading />}>
              <DashboardProjectsGrid userInitials={selectedViewer} />
            </Suspense>
          </section>

        </div>
      </div>
    </div>
  );
}