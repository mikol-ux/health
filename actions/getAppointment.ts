import { db } from "@/lib/db";

export async function GetAppointments({
  range,
  offset = 0,
  limit = 8,
}: {
  range?: string | undefined;
  offset?: number;
  limit?: number;
}) {
  let where = {};
  if (range === "past") {
    where = { day: { lt: new Date() } };
  } else if (range === "today") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    where = {
      day: {
        gte: today,
        lt: tomorrow,
      },
    };
  } else if (range === "future") {
    where = { day: { gt: new Date() } };
  }
  const data = await db.appointment.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const totalCount = await db.appointment.count({ where });
  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
