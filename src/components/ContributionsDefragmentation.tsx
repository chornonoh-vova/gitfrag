import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from "../hooks/use-debounce";
import type { ContributionCalendarDay } from "../lib/types";
import { useContributions } from "../lib/api";
import {
  bubbleSort,
  contributionCalendarDayCompare,
  countingSort,
  mergeSort,
  quickSort,
} from "../lib/sort";
import { UsernameInput } from "./UsernameInput";
import { AlgorithmSelect } from "./AlgorithmSelect";
import { ContributionsLoading } from "./ContributionsLoading";
import { ContributionsGraph } from "./ContributionsGraph";
import { AlgorithmExplainer } from "./AlgorithmExplainer";

import classes from "./ContributionsDefragmentation.module.css";

type PlaybackState = "initial" | "playing" | "paused" | "completed";

function contributionCountGetter(day: ContributionCalendarDay) {
  return day.contributionCount;
}

function recordSort(
  algorithm: string,
  contributionDays: ContributionCalendarDay[],
) {
  const recording: [number, ContributionCalendarDay][] = [];
  const recordingCallback = (
    index: number,
    element: ContributionCalendarDay,
  ) => {
    recording.push([index, element]);
  };

  switch (algorithm) {
    case "bubble": {
      bubbleSort(
        contributionDays,
        contributionCalendarDayCompare,
        recordingCallback,
      );
      break;
    }
    case "merge": {
      mergeSort(
        contributionDays,
        contributionCalendarDayCompare,
        recordingCallback,
      );
      break;
    }
    case "quick": {
      quickSort(
        contributionDays,
        contributionCalendarDayCompare,
        recordingCallback,
      );
      break;
    }
    case "counting": {
      countingSort(
        contributionDays,
        contributionCountGetter,
        recordingCallback,
      );
      break;
    }
    default:
      throw new Error("Unknown algorithm");
  }

  return recording;
}

export function ContributionsDefragmentation({
  initialUsername,
}: {
  initialUsername: string;
}) {
  const [username, setUsername] = useState(initialUsername);
  const debouncedUsername = useDebounce(username);

  const [algorithm, setAlgorithm] = useState("bubble");
  const [playbackState, setPlaybackState] = useState<PlaybackState>("initial");

  const [solutionIdx, setSolutionIdx] = useState(-1);
  const [solutionSteps, setSolutionSteps] = useState<
    [number, ContributionCalendarDay][]
  >([]);

  const [contributionDays, setContributionDays] = useState<
    ContributionCalendarDay[]
  >([]);

  const { data: contributions, isLoading } =
    useContributions(debouncedUsername);

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
    setPlaybackState("initial");
    resetSolution();
  };

  useEffect(() => {
    reset();
  }, [contributions]);

  useEffect(() => {
    let requestId: number;

    const step = () => {
      if (solutionIdx === -1 || playbackState === "paused") {
        return;
      }

      const [index, contributionDay] = solutionSteps[solutionIdx];

      const copiedContributionDays = structuredClone(contributionDays);
      copiedContributionDays[index] = contributionDay;
      setContributionDays(copiedContributionDays);

      if (solutionIdx === solutionSteps.length - 1) {
        resetSolution();
        setPlaybackState("completed");
      } else {
        setSolutionIdx(solutionIdx + 1);
        requestId = requestAnimationFrame(step);
      }
    };

    requestId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [playbackState, contributionDays, solutionSteps, solutionIdx]);

  const onPlayPauseClick = () => {
    setPlaybackState((prev) => {
      if (prev === "playing") {
        return "paused";
      }
      if (prev === "paused") {
        return "playing";
      }
      throw new Error("Invalid playback state");
    });
  };

  const onResetClick = () => {
    reset();
  };

  const onSortClick = () => {
    const recording = recordSort(algorithm, contributionDays);
    setPlaybackState("playing");
    setSolutionIdx(0);
    setSolutionSteps(recording);
  };

  return (
    <>
      <section className={classes.controls}>
        <div className={classes.usernameWrapper}>
          <UsernameInput
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={onUsernameChange}
          />
        </div>

        <div className={classes.actionsGroup}>
          <AlgorithmSelect
            label="Algorithm"
            name="algorithm"
            value={algorithm}
            onChange={onAlgorithmChange}
          />

          {playbackState !== "initial" && (
            <button onClick={onResetClick}>Reset</button>
          )}
          {(playbackState === "playing" || playbackState === "paused") && (
            <button onClick={onPlayPauseClick}>
              {playbackState === "playing" ? "Pause" : "Play"}
            </button>
          )}
          {playbackState === "initial" && (
            <button onClick={onSortClick}>Defrag</button>
          )}
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
    </>
  );
}
