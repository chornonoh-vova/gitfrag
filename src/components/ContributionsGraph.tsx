import type {
  ContributionCalendarDay,
  ContributionCalendarMonth,
} from "../lib/types";
import classes from "./ContributionsGraph.module.css";

const CONTRIBUTION_LEVEL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const gaCache: string[] = [];

function gridArea(index: number) {
  if (!gaCache[index]) {
    gaCache[index] = `${(index % 7) + 1} / ${Math.floor(index / 7) + 1}`;
  }
  return gaCache[index];
}

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
    <div className={classes.contributionsGraphWrapper}>
      <div className={classes.contributionsGraphScroll}>
        <div
          className={classes.contributionsGraph}
          style={{ gridTemplateColumns: `40px repeat(${weeks}, 12px)` }}
        >
          <div className={classes.contributionsMonths}>
            {months.map(({ name, totalWeeks }, index) => (
              <span key={index} style={{ gridColumn: `span ${totalWeeks}` }}>
                {name}
              </span>
            ))}
          </div>
          <div className={classes.contributionsDaysOfWeek}>
            <span style={{ gridRow: 2 }}>Mon</span>
            <span style={{ gridRow: 4 }}>Wed</span>
            <span style={{ gridRow: 6 }}>Fri</span>
          </div>
          <div className={classes.contributionsGrid}>
            {contributionDays.map(
              ({ contributionLevel, contributionCount, date }, index) => (
                <span
                  key={`${date}-${index}`}
                  className={classes.contribution}
                  data-level={CONTRIBUTION_LEVEL[contributionLevel]}
                  data-highlight={highlight === index}
                  style={{ gridArea: gridArea(index) }}
                  title={`${contributionCount} contributions on ${date}`}
                ></span>
              ),
            )}
          </div>
        </div>
      </div>
      <div className={classes.colorCodesWrapper}>
        <div className={classes.colorCodes}>
          <span>Less</span>
          <span className={classes.contribution} data-level="0"></span>
          <span className={classes.contribution} data-level="1"></span>
          <span className={classes.contribution} data-level="2"></span>
          <span className={classes.contribution} data-level="3"></span>
          <span className={classes.contribution} data-level="4"></span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
