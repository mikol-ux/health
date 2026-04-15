import { Suspense } from "react";
import { GetPatients } from "@/actions/patient";
import Pagination from "../_component/files/Pagination";
import CardList from "../_component/files/CardList";
import SearchPatients from "../_component/files/search";
import { Users } from "lucide-react";

export default async function Patients({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; limit?: string };
}) {
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages } = await GetPatients({ offset, limit, search });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">All Patients</h1>
            <p className="text-sm text-slate-400">{data.length} records shown</p>
          </div>
        </div>
        <SearchPatients />
      </div>

      {/* Table */}
      <Suspense key={search + currentPage} fallback={
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 text-sm animate-pulse">
          Loading patients…
        </div>
      }>
        <CardList data={data} />
      </Suspense>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
