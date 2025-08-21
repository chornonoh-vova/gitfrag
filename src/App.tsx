import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import { UsernameInput } from "./components/UsernameInput";

import "./App.css";
import { AlgorithmSelect } from "./components/AlgorithmSelect";
import { ContributionsGraph } from "./components/ContributionsGraph";
import { useContributions } from "./lib/github";
import { ContributionsLoading } from "./components/ContributionsLoading";
import type { ContributionCalendarDay } from "./lib/types";
import {
  bubbleSort,
  contributionCalendarDayCompare,
  countingSort,
  mergeSort,
  quickSort,
} from "./lib/sort";
import { AlgorithmExplainer } from "./components/AlgorithmExplainer";

function App() {
  const [username, setUsername] = useState("chornonoh-vova");
  const [algorithm, setAlgorithm] = useState("bubble");
  const [sorted, setSorted] = useState(false);

  const [solutionIdx, setSolutionIdx] = useState(-1);
  const [solutionSteps, setSolutionSteps] = useState<
    [number, ContributionCalendarDay][]
  >([]);

  const [contributionDays, setContributionDays] = useState<
    ContributionCalendarDay[]
  >([]);

  const { data: contributions, isLoading } = useContributions(username);

  const initialContributions = () => {
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

  const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const onAlgorithmChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  }, []);

  const resetSolution = () => {
    setSolutionIdx(-1);
    setSolutionSteps([]);
  };

  const reset = () => {
    setContributionDays(initialContributions());
    setSorted(false);
    resetSolution();
  };

  useEffect(() => {
    reset();
  }, [contributions]);

  useEffect(() => {
    let requestId: number;

    const step = () => {
      if (solutionIdx === -1) {
        return;
      }

      const [index, contributionDay] = solutionSteps[solutionIdx];

      const copiedContributionDays = structuredClone(contributionDays);
      copiedContributionDays[index] = contributionDay;
      setContributionDays(copiedContributionDays);

      if (solutionIdx === solutionSteps.length - 1) {
        resetSolution();
        setSorted(true);
      } else {
        setSolutionIdx(solutionIdx + 1);
        requestId = requestAnimationFrame(step);
      }
    };

    requestId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [contributionDays, solutionSteps, solutionIdx]);

  const onResetClick = () => {
    reset();
  };

  const onSortClick = () => {
    let sorted: ContributionCalendarDay[];
    const recording: [number, ContributionCalendarDay][] = [];
    const recordingCallback = (
      index: number,
      element: ContributionCalendarDay,
    ) => {
      recording.push([index, element]);
    };

    switch (algorithm) {
      case "bubble": {
        sorted = bubbleSort(
          contributionDays,
          contributionCalendarDayCompare,
          recordingCallback,
        );
        break;
      }
      case "merge": {
        sorted = mergeSort(
          contributionDays,
          contributionCalendarDayCompare,
          recordingCallback,
        );
        break;
      }
      case "quick": {
        sorted = quickSort(
          contributionDays,
          contributionCalendarDayCompare,
          recordingCallback,
        );
        break;
      }
      case "counting": {
        sorted = countingSort(
          contributionDays,
          (e) => e.contributionCount,
          recordingCallback,
        );
        break;
      }
      default:
        throw new Error("Unknown algorithm");
    }

    setSolutionIdx(0);
    setSolutionSteps(recording);
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
          onChange={onUsernameChange}
        />

        <div className="actions-group">
          <AlgorithmSelect
            label="Algorithm"
            name="algorithm"
            value={algorithm}
            onChange={onAlgorithmChange}
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
          highlight={solutionSteps[solutionIdx]?.[0]}
        />
      )}

      <AlgorithmExplainer algorithm={algorithm} />
    </main>
  );
}

export default App;
