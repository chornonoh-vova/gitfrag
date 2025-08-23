import type { VercelRequest, VercelResponse } from "@vercel/node";
import dedent from "dedent";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.cookies.gh_token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const username = req.query.username;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Missing 'username' query param" });
  }

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
                contributionLevel
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  res.status(200).json(data);
}
