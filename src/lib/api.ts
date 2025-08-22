import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  ContributionsSchema,
  UserSchema,
  type Contributions,
  type User,
} from "./types";

export async function logout() {
  await fetch("/api/logout");
}

export function useUser() {
  return useQuery(userOptions());
}

function userOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
}

async function fetchUser(): Promise<User> {
  const response = await fetch("/api/user");
  const raw = await response.json();
  return UserSchema.parse(raw);
}

export function useContributions(username: string) {
  return useQuery(contributionsOptions(username));
}

function contributionsOptions(username: string) {
  return queryOptions({
    queryKey: ["contributions", username],
    queryFn: () => fetchContributions(username),
  });
}

async function fetchContributions(username: string): Promise<Contributions> {
  const response = await fetch(`/api/contributions?username=${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
