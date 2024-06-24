import { Suspense } from "react";

import { GetPatients } from "@/actions/patient";
import Pagination from "../_component/files/Pagination";
import SkeletonCardList from "../_component/files/skeleton";
import CardList from "../_component/files/CardList";
import SearchPatients from "../_component/files/search";

export default async function Patients({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 6;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages } = await GetPatients({ offset, limit, search });

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex">
          <SearchPatients />
        </div>
      </div>
      <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
        <CardList data={data} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  );
}
