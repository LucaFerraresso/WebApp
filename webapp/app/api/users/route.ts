// pages/api/users.ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Recupera tutti gli utenti dal database
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}
