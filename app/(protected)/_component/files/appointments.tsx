// import { Appointment } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectAppointment from "./SelectAppointment";
import { FaFilter } from "react-icons/fa";
import { Patient } from "@prisma/client";
export interface Appointment {
  id: string;
  day: Date;
  time: string;
  daytime: string | null;
  note: string;
  patientId: string;
  patient: Patient;
}
const Appointments = ({ data }: { data: Appointment[] }) => {
  return (
    <div className="flex flex-col justify-end items-end">
      <div className="flex justify-end items-end">
        <strong className="text-2xl p-2">
          <FaFilter />
        </strong>{" "}
        <SelectAppointment />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">S/N</TableHead>
            <TableHead className="">NAME</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>appointment status</TableHead>
            {/* <TableHead>
              <SelectAppointment />
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow className="text-xs py-2 px-8" key={p.id}>
              <TableCell className="font-medium py-2 px-8">{p.id}</TableCell>
              <TableCell className="py-2 px-8">{p.patient.fullname}</TableCell>

              <TableCell className="py-2 px-8">
                {p.day.toLocaleDateString()}
              </TableCell>
              <TableCell className="py-2 px-8">{p.time}</TableCell>
              <TableCell className="py-2 px-8">{p.note}</TableCell>

              <TableCell className="py-2 px-8">
                {p.day < new Date() ? (
                  <p className="p-1 rounded bg-red-700">diminished</p>
                ) : p.day === new Date() ? (
                  <p className="p-1 rounded bg-green-600">today</p>
                ) : p.day > new Date() ? (
                  <p className="bg-amber-500 p-1 rounded">pending</p>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appointments;
