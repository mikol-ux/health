"use client";

import { Delete } from "@/actions/delete";
import { useRouter } from "next/navigation";
interface LogoutButtonProps {
  children?: React.ReactNode;
  childId: string;
}
export const DeleteButton = ({ children, childId }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    Delete(childId);
    router.refresh();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
