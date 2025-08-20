import { useEffect, useState } from "react";

import { UsernameInput } from "./components/UsernameInput";

import "./App.css";
import { AlgorithmSelect } from "./components/AlgorithmSelect";
import { ContributionsGraph } from "./components/ContributionsGraph";
import { useContributions } from "./lib/github";
import { ContributionsLoading } from "./components/ContributionsLoading";
import type { ContributionCalendarDay } from "./lib/types";
import { bubbleSort } from "./lib/sort";

function App() {
  const [username, setUsername] = useState("chornonoh-vova");
  const [algorithm, setAlgorithm] = useState("bubble");
  const [sorted, setSorted] = useState(false);

  const [contributionDays, setContributionDays] = useState<
    ContributionCalendarDay[]
  >([]);

  const { data: contributions, isLoading } = useContributions(username);

  const transformContributions = () => {
    if (!contributions) {
      return [];
    }

    if (!contributions.data.user) {
      return [];
    }

    const collection = contributions.data.user.contributionsCollection;

    const days = [];
    for (const week of collection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        days.push(day);
      }
    }

    return days;
  };

  useEffect(() => {
    setContributionDays(transformContributions());
    setSorted(false);
  }, [contributions]);

  const onResetClick = () => {
    setContributionDays(transformContributions());
    setSorted(false);
  };

  const onSortClick = () => {
    switch (algorithm) {
      case "bubble": {
        setContributionDays(
          bubbleSort(
            contributionDays,
            (a, b) => a.contributionCount - b.contributionCount,
          ),
        );
        setSorted(true);
        break;
      }
      default:
        throw new Error("Unknown algorithm");
    }
  };

  return (
    <main className="main">
      <h1>GitFrag</h1>
      <p style={{ marginBlockEnd: "32px" }}>
        Organize your commits, the old-school way
      </p>

      <section className="controls">
        <UsernameInput
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="actions-group">
          <AlgorithmSelect
            label="Algorithm"
            name="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          />
          {sorted && (
            <button className="btn" onClick={onResetClick}>
              Reset
            </button>
          )}
          <button className="btn" onClick={onSortClick}>
            Defrag
          </button>
        </div>
      </section>

      {isLoading ? (
        <ContributionsLoading />
      ) : (
        <ContributionsGraph
          months={
            contributions?.data.user?.contributionsCollection
              .contributionCalendar.months ?? []
          }
          weeks={
            contributions?.data.user?.contributionsCollection
              .contributionCalendar.weeks.length ?? 0
          }
          contributionDays={contributionDays}
        />
      )}
    </main>
  );
}

export default App;
