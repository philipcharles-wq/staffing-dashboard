import { staffingStages, type StaffingStage } from "@/lib/types";

type StatusTrackerProps = {
  currentStage: StaffingStage;
  headline?: string;
};

const trackerLabels: Record<StaffingStage, string> = {
  Received: "Received",
  "Under Review": "Review",
  "Leadership Locked": "Leadership",
  "Team Build in Progress": "Team Build",
  "Awaiting Final Confirmation": "Final Confirm",
  "Team Confirmed": "Confirmed",
};

const SLICE_COUNT = staffingStages.length;
const VIEWBOX_SIZE = 240;
const CENTER = 120;
const RADIUS = 78;
const CRUST_RADIUS = 95;
const INNER_LABEL_RADIUS = 28;

const TOPPINGS = [
  { x: 79, y: 65, r: 5.2 },
  { x: 121, y: 63, r: 4.7 },
  { x: 156, y: 94, r: 5.1 },
  { x: 140, y: 140, r: 4.8 },
  { x: 91, y: 152, r: 5.3 },
  { x: 56, y: 111, r: 4.5 },
  { x: 97, y: 86, r: 3.8 },
  { x: 121, y: 120, r: 3.5 },
  { x: 143, y: 114, r: 3.4 },
];

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeSlice(index: number) {
  const sliceAngle = 360 / SLICE_COUNT;
  const startAngle = index * sliceAngle;
  const endAngle = startAngle + sliceAngle;
  const start = polarToCartesian(CENTER, CENTER, RADIUS, endAngle);
  const end = polarToCartesian(CENTER, CENTER, RADIUS, startAngle);

  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${RADIUS} ${RADIUS} 0 0 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function describeDivider(index: number) {
  const angle = index * (360 / SLICE_COUNT);
  const start = polarToCartesian(CENTER, CENTER, 24, angle);
  const end = polarToCartesian(CENTER, CENTER, RADIUS + 4, angle);

  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}

export function StatusTracker({ currentStage, headline }: StatusTrackerProps) {
  const currentIndex = staffingStages.indexOf(currentStage);

  return (
    <div className="pizza-tracker" aria-label="Project staffing progress">
      <div className="pizza-tracker-visual">
        <svg
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          className="pizza-svg"
          role="img"
          aria-label={`Current stage: ${currentStage}`}
        >
          <defs>
            <radialGradient id="pizza-base-gradient" cx="35%" cy="30%" r="74%">
              <stop offset="0%" stopColor="#fbf2e4" />
              <stop offset="58%" stopColor="#f2dfbd" />
              <stop offset="100%" stopColor="#e7cfaa" />
            </radialGradient>

            <linearGradient
              id="pizza-crust-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#edbe7a" />
              <stop offset="48%" stopColor="#d89755" />
              <stop offset="100%" stopColor="#b97842" />
            </linearGradient>

            <radialGradient
              id="pizza-center-gradient"
              cx="35%"
              cy="30%"
              r="85%"
            >
              <stop offset="0%" stopColor="rgba(255,251,247,0.99)" />
              <stop offset="100%" stopColor="rgba(250,240,228,0.96)" />
            </radialGradient>

            <pattern
              id="pizza-speckle"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="6" cy="8" r="1.1" fill="rgba(185, 120, 66, 0.12)" />
              <circle cx="16" cy="6" r="0.9" fill="rgba(185, 120, 66, 0.10)" />
              <circle cx="11" cy="15" r="1.2" fill="rgba(185, 120, 66, 0.08)" />
              <circle cx="20" cy="18" r="0.8" fill="rgba(185, 120, 66, 0.10)" />
            </pattern>

            <filter
              id="pizza-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                floodColor="#8e4d2a"
                floodOpacity="0.18"
              />
            </filter>

            <filter
              id="pizza-inner-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="1.3"
                floodColor="#fff4e3"
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          <circle
            cx={CENTER}
            cy={CENTER}
            r={CRUST_RADIUS + 6}
            fill="#a76333"
            opacity="0.14"
          />

          <circle
            cx={CENTER}
            cy={CENTER}
            r={CRUST_RADIUS}
            fill="url(#pizza-crust-gradient)"
            stroke="#b97842"
            strokeWidth="3.6"
            filter="url(#pizza-shadow)"
          />

          <circle
            cx={CENTER}
            cy={CENTER}
            r={CRUST_RADIUS - 5}
            fill="none"
            stroke="rgba(255, 234, 199, 0.42)"
            strokeWidth="2.4"
            opacity="0.78"
          />

          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 5}
            fill="url(#pizza-base-gradient)"
            stroke="#efd9b7"
            strokeWidth="1.8"
            filter="url(#pizza-inner-shadow)"
          />

          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 3}
            fill="url(#pizza-speckle)"
            opacity="0.55"
          />

          {staffingStages.map((stage, index) => {
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;

            const fill = isCurrent
              ? "#f29a4d"
              : isComplete
                ? "#ef8e68"
                : index % 2 === 0
                  ? "#eee2cf"
                  : "#e5d5bc";

            const opacity = isCurrent ? 0.98 : isComplete ? 0.95 : 0.9;

            return (
              <path
                key={stage}
                d={describeSlice(index)}
                fill={fill}
                opacity={opacity}
                stroke="#f6ead7"
                strokeWidth="3"
              />
            );
          })}

          {Array.from({ length: SLICE_COUNT }).map((_, index) => (
            <path
              key={`divider-${index}`}
              d={describeDivider(index)}
              stroke="#cda16c"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.62"
            />
          ))}

          {TOPPINGS.map((topping, index) => (
            <g key={`topping-${index}`} opacity="0.92">
              <circle
                cx={topping.x}
                cy={topping.y}
                r={topping.r}
                fill={index % 3 === 0 ? "#f3efe9" : "#f7f3ed"}
                stroke={index % 3 === 0 ? "#d08a61" : "#d7a070"}
                strokeWidth="1.15"
              />
              <circle
                cx={topping.x}
                cy={topping.y}
                r={Math.max(1.4, topping.r - 2.3)}
                fill="none"
                stroke="rgba(208, 138, 97, 0.45)"
                strokeWidth="0.9"
              />
            </g>
          ))}

          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_LABEL_RADIUS}
            fill="url(#pizza-center-gradient)"
            stroke="#d7b086"
            strokeWidth="2"
          />

          <text
            x={CENTER}
            y={CENTER - 2}
            textAnchor="middle"
            fontSize="22"
            fontWeight="900"
            fill="#7d3923"
            letterSpacing="-0.04em"
          >
            {currentIndex + 1}/{SLICE_COUNT}
          </text>

          <text
            x={CENTER}
            y={CENTER + 17}
            textAnchor="middle"
            fontSize="9"
            fontWeight="900"
            fill="#9a5639"
            letterSpacing="0.12em"
          >
            STAFFED
          </text>
        </svg>
      </div>

      <div className="pizza-tracker-body">
        <div className="pizza-tracker-eyebrow">Staffing progress</div>
        <div className="pizza-tracker-title">
          {headline ?? trackerLabels[currentStage]}
        </div>
      </div>
    </div>
  );
}