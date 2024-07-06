"use client";

import { useRouter } from "next/navigation";
import { logout } from "../../actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    logout();

    router.push("/");
    router.refresh();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
