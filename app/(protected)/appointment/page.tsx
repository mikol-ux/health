import React from "react";
import Appointment from "../_component/files/appointment";
import { auth } from "@/auth";
import {
  deleteAppointment,
  getPatientId,
  getUserAppointment,
} from "@/data/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MdDeleteForever } from "react-icons/md";
import { Delete } from "@/actions/delete";
import { DeleteButton } from "@/components/auth/delete-button";
import { getPatientByuserId } from "@/data/userProfile";
import { FcCancel } from "react-icons/fc";
const BookAppoint = async () => {
  const user = await auth();
  const mainUser = user?.user.profile.id;
  const userAppointment = await getUserAppointment(mainUser);
  const date = () => {
    const dateString = userAppointment?.day.toISOString().split("T")[0];
    const year = dateString?.substring(0, 4);
    const month = dateString?.substring(5, 7); // Month is 0-indexed, adjust if needed
    const day = dateString?.substring(8);
    return day + "-" + month + "-" + year;
  };

  if (userAppointment) {
    return (
      <div className="w-full flex justify-center items-center p-4">
        <Card className="relative shadow-lg rounded-lg border border-gray-200 max-w-md w-full">
          <CardHeader className="flex justify-center">
            <CardTitle className="text-lg font-semibold text-center">
              Booked Appointment
            </CardTitle>
            <div className="absolute top-3 right-3">
              <DeleteButton childId={userAppointment.id}>
                {/* <MdDeleteForever className="text-red-500 hover:text-red-700 cursor-pointer text-2xl" /> */}
                <FcCancel />
              </DeleteButton>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4 p-4">
            <p className="text-xl font-bold">{date()}</p>
            <p className="text-lg font-semibold">{userAppointment.time}</p>
            <p className="text-gray-600">{userAppointment.note}</p>
          </CardContent>
          <CardFooter className="bg-gray-50 py-2 text-center mx-auto">
            Please arrive on time for your appointment.
          </CardFooter>
        </Card>
      </div>
    );
  }
  return <Appointment />;
};
export default BookAppoint;
