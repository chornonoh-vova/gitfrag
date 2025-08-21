import type {
  ContributionCalendarDay,
  ContributionCalendarMonth,
} from "../lib/types";
import "./ContributionsGraph.css";

export function ContributionsGraph({
  months,
  weeks,
  contributionDays,
  highlight,
}: {
  months: ContributionCalendarMonth[];
  weeks: number;
  contributionDays: ContributionCalendarDay[];
  highlight: number | undefined;
}) {
  return (
    <div className="contributions-graph-wrapper">
      <div
        className="contributions-graph"
        style={{
          gridTemplateColumns: `40px repeat(${weeks}, 12px)`,
        }}
      >
        <div className="contributions-months">
          {months.map(({ name, totalWeeks }, index) => (
            <span
              key={index}
              style={{
                gridColumn: `span ${totalWeeks}`,
              }}
            >
              {name}
            </span>
          ))}
        </div>
        <div className="contributions-days-of-week">
          <span style={{ gridRow: 2 }}>Mon</span>
          <span style={{ gridRow: 4 }}>Wed</span>
          <span style={{ gridRow: 6 }}>Fri</span>
        </div>
        <div className="contributions-grid">
          {contributionDays.map(({ color, contributionCount, date }, index) => (
            <span
              key={`${date}-${index}`}
              className="contribution"
              style={{
                backgroundColor: color,
                gridArea: `${(index % 7) + 1} / ${Math.floor(index / 7) + 1}`,
                outline: highlight === index ? "2px solid #0969da" : undefined,
              }}
              title={`${contributionCount} contributions on ${date}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
