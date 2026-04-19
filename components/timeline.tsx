import type { TimelineEntry } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

type TimelineProps = {
  items: TimelineEntry[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article key={item.id} className="timeline-item">
          <div className="timeline-meta">{formatDateTime(item.timestamp)}</div>
          <div className="timeline-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
