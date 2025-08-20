import { queryOptions, useQuery } from "@tanstack/react-query";
import dedent from "dedent";
import { ContributionsSchema, type Contributions } from "./types";

const API_URL = "https://api.github.com/graphql";

export function useContributions(username: string) {
  return useQuery(contributionsOptions(username));
}

function contributionsOptions(username: string) {
  return queryOptions({
    queryKey: ["contributions", username],
    queryFn: () => fetchContributions(username),
  });
}

export async function fetchContributions(
  username: string,
): Promise<Contributions> {
  const query = dedent`
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            months {
              name
              totalWeeks
            }
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const details = await response.json();
    throw new Error(
      `Error fetching contributions ${response.status} ${response.statusText}`,
      { cause: details?.message },
    );
  }

  const raw = await response.json();

  return ContributionsSchema.parse(raw);
}
