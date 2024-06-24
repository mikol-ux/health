"use client";

import { Delete } from "@/actions/deleteUser";
import { useRouter } from "next/navigation";
interface LogoutButtonProps {
  childId: string;
}
export const DeleteUser = ({ childId }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    Delete(childId);
    router.refresh();
  };
  return <span onClick={onClick} className="cursor-pointer"></span>;
};
