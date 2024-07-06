"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectAppointment() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((range: string) => {
    const params = new URLSearchParams(searchParams);
    if (range) {
      params.set("range", range);
      params.set("page", "1");
    } else {
      params.delete("range");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Select
      onValueChange={(value: string) => {
        handleSearch(value);
      }}
      defaultValue={searchParams.get("range") || "all"}
    >
      <SelectTrigger>
        <SelectValue placeholder="filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="past">Past</SelectItem>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="future">Future</SelectItem>
      </SelectContent>
    </Select>
  );
}
