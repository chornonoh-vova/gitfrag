import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader("Set-Cookie", [
    "gh_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
  ]);

  res.status(200).json({ success: true });
}
