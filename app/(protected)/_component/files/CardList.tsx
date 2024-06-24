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
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">name</TableHead>
            <TableHead>dob</TableHead>
            <TableHead>gender</TableHead>
            <TableHead>admission status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow className="text-xs p-0">
              <TableCell className="font-medium">{p.fullname}</TableCell>
              <TableCell>{p.dob}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>
                <p
                  className={`${
                    p.admitted === true ? "bg-green-500" : "bg-red-500"
                  } text-center rounded opacity-50 `}
                >
                  {p.admitted === true ? "admitted" : "not admitted"}
                </p>
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteUser(p.id)}>
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="ghost">
                  <Link href={`/patient/${p.id}?tab=profile`}>
                    View medical history
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*  {data.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} email={p.email} />
      ))} */}
    </div>
  );
}
