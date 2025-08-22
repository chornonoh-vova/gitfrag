import type { VercelRequest, VercelResponse } from "@vercel/node";
import dedent from "dedent";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.cookies.gh_token;

  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  const query = dedent`
    {
      viewer {
        login
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

  if (!response.ok) {
    return res.status(200).json({ authenticated: false });
  }

  const data = (await response.json()) as any;

  if (data.errors) {
    return res.status(200).json({ authenticated: false });
  }

  res.status(200).json({
    authenticated: true,
    username: data.data.viewer.login,
  });
}
