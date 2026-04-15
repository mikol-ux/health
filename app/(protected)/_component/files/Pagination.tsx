"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-between mt-6 px-1">
      <p className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-700">{currentPage}</span> of{" "}
        <span className="font-medium text-slate-700">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className={isFirst ? "pointer-events-none opacity-40" : ""}
        >
          <Link href={createPageURL(currentPage - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className={isLast ? "pointer-events-none opacity-40" : ""}
        >
          <Link href={createPageURL(currentPage + 1)}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
