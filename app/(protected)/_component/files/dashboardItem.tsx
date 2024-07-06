import { dashboardData } from "@/actions/deleteUser";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import React from "react";

const DashBoardItem = async () => {
  const user = await auth();
  const { admittedPatients, totalrecordedpatients, appointments } =
    await dashboardData();

  if (user?.user.role === UserRole.PATIENT) {
    return (
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">
          Dashboard Overview
        </h2>
      </div>
    );
  }
  return (
    <div className="p-4 bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-4 bg-yellow-400 opacity-90 rounded-lg shadow-md">
          <p className="text-black">
            <strong className="text-lg md:text-xl">
              Total Recorded Patients:
            </strong>
            <br /> {totalrecordedpatients}
          </p>
        </div>

        <div className="p-4 bg-green-400 opacity-90 rounded-lg shadow-md">
          <p className="text-black">
            <strong className="text-lg md:text-xl">Admitted Patients:</strong>
            <br /> {admittedPatients}
          </p>
        </div>

        <Link
          href="/appointments"
          className="p-4 bg-blue-400 opacity-90 rounded-lg shadow-md hover:shadow-lg hover:shadow-black"
        >
          <p className="text-black">
            <strong className="text-lg md:text-xl">Appointments:</strong>
            <br /> {appointments}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashBoardItem;
