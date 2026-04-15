import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config();

// Used by Prisma CLI (db push, migrate, generate)
export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
