"use client";

import { useRouter } from "next/navigation";
import { deleteAccount } from "../../actions/deleteAccount";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const DeleteButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    deleteAccount();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
