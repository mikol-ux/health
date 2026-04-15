import React from "react";
import Appointment from "../_component/files/appointment";
import { auth } from "@/auth";
import { getUserAppointment } from "@/data/user";
import { Delete } from "@/actions/delete";
import { DeleteButton } from "@/components/auth/delete-button";
import { CalendarDays, Clock, FileText, Trash2, CheckCircle } from "lucide-react";

const BookAppoint = async () => {
  const user = await auth();
  const mainUser = user?.user?.profile?.id;
  const userAppointment = mainUser ? await getUserAppointment(mainUser) : null;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  if (userAppointment) {
    return (
      <div className="max-w-lg mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">My Appointment</h1>
            <p className="text-sm text-slate-400">Your upcoming appointment details</p>
          </div>
        </div>

        {/* Appointment card */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white">
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-1">Confirmed Appointment</p>
            <h2 className="text-xl font-bold">{formatDate(userAppointment.day)}</h2>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Clock className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Time</p>
                <p className="text-sm font-semibold text-slate-800">{userAppointment.time}</p>
              </div>
            </div>

            {userAppointment.note && (
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Note</p>
                  <p className="text-sm text-slate-600">{userAppointment.note}</p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-3">Please arrive 10 minutes before your scheduled time.</p>
              <DeleteButton childId={userAppointment.id}>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 text-sm font-medium rounded-xl transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Cancel Appointment
                </div>
              </DeleteButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-sky-500" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Book Appointment</h1>
          <p className="text-sm text-slate-400">Schedule your visit with a doctor</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <Appointment />
      </div>
    </div>
  );
};

export default BookAppoint;
