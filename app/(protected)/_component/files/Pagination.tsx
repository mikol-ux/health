"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface IPagination {
  totalPages: number;
}

export default function Pagination({ totalPages }: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="flex items-center justify-between space-x-3">
        <Button
          asChild
          className="p-5 text-xl"
          variant={currentPage - 1 === 0 ? "destructive" : "default"}
        >
          <Link
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
            }
          >
            NEXT
          </Link>
        </Button>
        <Button
          asChild
          className="p-5 text-xl"
          variant={currentPage >= totalPages ? "destructive" : "default"}
        >
          <Link
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages ? `pointer-events-none opacity-50` : ""
            }
          >
            PREV
          </Link>
        </Button>
      </div>
    </>
  );
}
