"use client";
import type { Patient } from "@prisma/client";
import PokemonCard from "./Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Delete } from "@/actions/deleteUser";

export default function CardList({ data }: { data: Patient[] }) {
  const router = useRouter();
  const deleteUser = (id: string) => {
    Delete(id);
    router.refresh();
  };

  return (
    <div className="">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 text-xs sm:text-sm">Name</TableHead>
            <TableHead className="px-6 py-3 text-xs sm:text-sm hidden md:table-cell">
              DOB
            </TableHead>
            <TableHead className="px-6 py-3 text-xs sm:text-sm hidden md:table-cell">
              Gender
            </TableHead>
            <TableHead className="px-6 py-3 text-xs sm:text-sm hidden md:table-cell">
              Admission Status
            </TableHead>
            <TableHead className="px-6 py-3 text-xs sm:text-sm">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow className="text-xs py-2 px-4 sm:px-6 sm:py-4" key={p.id}>
              <TableCell className="font-medium whitespace-nowrap">
                {p.fullname}
              </TableCell>
              <TableCell className="whitespace-nowrap hidden md:table-cell">
                {p.dob}
              </TableCell>
              <TableCell className="whitespace-nowrap hidden md:table-cell">
                {p.gender}
              </TableCell>
              <TableCell className="whitespace-nowrap hidden md:table-cell">
                <p
                  className={`${
                    p.admitted === true ? "bg-green-500" : "bg-red-500"
                  } text-center rounded opacity-50`}
                >
                  {p.admitted === true ? "Admitted" : "Not Admitted"}
                </p>
              </TableCell>
              <TableCell className="whitespace-nowrap space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  <Link href={`/patient/${p.id}?tab=profile`}>
                    View Medical History
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
