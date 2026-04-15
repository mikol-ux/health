"use client";

import type { Patient } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Delete } from "@/actions/deleteUser";
import { Eye, Trash2, UserCheck, UserX } from "lucide-react";

export default function CardList({ data }: { data: Patient[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await Delete(id);
    router.refresh();
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <UserX className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-slate-500 font-medium">No patients found</p>
        <p className="text-slate-400 text-sm mt-1">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Patient</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">DOB</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Gender</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Status</th>
            <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-sky-600 font-semibold text-sm">
                      {p.fullname.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{p.fullname}</p>
                    <p className="text-xs text-slate-400">{p.phone}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">{p.dob}</td>
              <td className="px-5 py-4 text-sm text-slate-600 capitalize hidden md:table-cell">{p.gender}</td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  p.admitted
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {p.admitted ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                  {p.admitted ? "Admitted" : "Outpatient"}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/patient/${p.id}?tab=profile`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-medium rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
