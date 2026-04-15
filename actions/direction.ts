import { auth } from "@/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const direction = async (role: UserRole) => {
  const session = await auth();
  await db.user.update({
    where: { id: session?.user.id as string },
    data: {
      role: role,
    },
  });
};
