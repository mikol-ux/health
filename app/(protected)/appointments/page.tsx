import Pagination from "../_component/files/Pagination";
import Appointments from "../_component/files/appointments";
import { GetAppointments } from "@/actions/getAppointment";
import { CalendarDays } from "lucide-react";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams?: { range?: string; page?: string; limit?: string };
}) {
  const range = searchParams?.range || "all";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages } = await GetAppointments({ range, offset, limit });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Appointments</h1>
          <p className="text-sm text-slate-400">All scheduled patient appointments</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <CalendarDays className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">No appointments found</p>
          <p className="text-slate-400 text-sm mt-1">Try changing the filter</p>
        </div>
      ) : (
        <>
          <Appointments data={data} />
          <Pagination totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
