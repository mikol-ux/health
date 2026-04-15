import React from "react";
import SelectAppointment from "./SelectAppointment";
import { CalendarDays, Clock, FileText, Filter, User } from "lucide-react";
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

function getStatusStyle(day: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const apptDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());

  if (apptDay < today) return { label: "Completed", className: "bg-slate-100 text-slate-500" };
  if (apptDay.getTime() === today.getTime()) return { label: "Today", className: "bg-emerald-50 text-emerald-700" };
  return { label: "Upcoming", className: "bg-amber-50 text-amber-700" };
}

const Appointments = ({ data }: { data: Appointment[] }) => {
  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{data.length} appointments</p>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <SelectAppointment />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Patient</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Date</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Time</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Note</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((p) => {
              const status = getStatusStyle(p.day);
              return (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-sky-500" />
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">{p.patient.fullname}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                      {p.day.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {p.time}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 max-w-[200px] truncate">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {p.note || "—"}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
