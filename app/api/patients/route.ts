import { db } from "@/lib/db";

export async function GET(req: any, res: any) {
  const users = await db.random.findMany({
    take: 10, // Fetch 10 users per page
    skip: req.query.page ? (parseInt(req.query.page) - 1) * 10 : 0, // Skip users based on page number
  });
  res.json(users);
}
