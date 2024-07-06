import Link from "next/link";

import Pagination from "../_component/files/Pagination";
import Appointment from "../_component/files/appointment";
import Appointments from "../_component/files/appointments";
import { GetAppointments } from "@/actions/getAppointment";
import SelectAppointment from "../_component/files/SelectAppointment";

interface Appointment {
  id: string;
  day: string;
  time: string;
  note: string;
  patient: {
    name: string;
  };
}

interface AppointmentsProps {
  appointments: Appointment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const AppointmentsTable = async ({
  searchParams,
}: {
  searchParams?: {
    range?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const range = searchParams?.range || "all";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 6;
  const offset = (currentPage - 1) * limit;
  const { data, totalPages } = await GetAppointments({ range, offset, limit });

  return (
    <div>
      <div className="mb-6">
        {data.length === 0 ? (
          <p className="p-1 m-8 text-8xl opacity-30">NO APPOINTMENTS</p>
        ) : (
          <Appointments data={data} />
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default AppointmentsTable;
