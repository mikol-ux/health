"use server";

import { db } from "@/lib/db";

export async function GetPatients({
  search,
  offset = 0,
  limit = 8,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}) {
  const data = await db.patient.findMany({
    where: { fullname: { contains: search } },
    skip: offset,
    take: limit,
  });

  const totalCount = await db.patient.count({
    where: { fullname: { contains: search } },
  });
  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
