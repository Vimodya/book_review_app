// pages/api/getUserName.ts
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email }).select("firstName lastName");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
