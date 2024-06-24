import React from "react";
import Appointment from "../_component/files/appointment";
import { auth } from "@/auth";
import { deleteAppointment, getUserAppointment } from "@/data/user";
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
const BookAppoint = async () => {
  const user = await auth();
  const mainUser = user?.user.patientId;
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
      <div className="w-full flex justify-center items-center relative">
        <Card>
          <CardHeader>
            <CardTitle>Booked appointment </CardTitle>
            <div className="absolute top-1 right-1 text-2xl">
              <DeleteButton
                childId={userAppointment.id}
                children={<MdDeleteForever />}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center font-extrabold">{date()}</p>
            <p className="text-center font-extrabold">{userAppointment.time}</p>
            <p className="text-center">{userAppointment.note}</p>
          </CardContent>
          <CardFooter>
            <p className="p-1 text-gray-500">
              please go to appointment on time
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Appointment />
    </div>
  );
};
export default BookAppoint;
