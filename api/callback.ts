import type { VercelRequest, VercelResponse } from "@vercel/node";

type AccessTokenResponse = {
  access_token: string;
};

type ErrorResponse = {
  error: string;
  error_description: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code;

  if (!code || typeof code !== "string") {
    return res.status(403).json({ error: "Missing code" });
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = (await response.json()) as AccessTokenResponse & ErrorResponse;

  if (data.error) {
    return res.status(400).json({ error: data.error_description });
  }

  res.setHeader("Set-Cookie", [
    `gh_token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
  ]);

  res.redirect("/");
}
