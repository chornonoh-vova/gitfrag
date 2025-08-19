import { queryOptions, useQuery } from "@tanstack/react-query";
import dedent from "dedent";
import { z } from "zod";

const API_URL = "https://api.github.com/graphql";

const ContributionsSchema = z.object({
  data: z.object({
    user: z
      .object({
        contributionsCollection: z.object({
          contributionCalendar: z.object({
            months: z.array(
              z.object({
                name: z.string(),
                totalWeeks: z.number(),
              }),
            ),
            weeks: z.array(
              z.object({
                contributionDays: z.array(
                  z.object({
                    color: z.string(),
                    contributionCount: z.number(),
                  }),
                ),
              }),
            ),
          }),
        }),
      })
      .nullable(),
  }),
  errors: z
    .array(
      z.object({
        type: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
});

export type Contributions = z.infer<typeof ContributionsSchema>;

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
  const query = dedent`{
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
