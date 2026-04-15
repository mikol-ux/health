import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const createPrismaClient = () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  });
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
