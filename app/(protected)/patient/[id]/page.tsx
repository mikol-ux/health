import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Patient_profile from "../../_component/files/patient_profile";
import Medical_report from "../../_component/files/Medical-record";

import { testing } from "@/actions/testing";
import Link from "next/link";
import Injection from "../../_component/files/injection";
import Doctors_Report from "../../_component/files/Doctors report";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

const Patient = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await auth();
  const recenttab = searchParams.tab || "profile";
  console.log(recenttab);
  const { profile, doctorsreport, medication, injection } = await testing(
    params.id
  );
  console.log(params.id);

  return (
    <div className="w-full">
      <p className="text-center text-4xl font-bold">
        <span className=""></span>
        {profile?.fullname}
      </p>
      <Tabs defaultValue={recenttab} className="w-full">
        <TabsList>
          <TabsTrigger value="profile">
            <Link
              href={{
                query: {
                  tab: "profile",
                },
              }}
            >
              profile
            </Link>
          </TabsTrigger>
          <TabsTrigger value="medicalrecord">
            <Link
              href={{
                query: {
                  tab: "medicalrecord",
                },
              }}
            >
              medical Record
            </Link>
          </TabsTrigger>
          {/* <TabsTrigger value="medications">
            <Link
              href={{
                query: {
                  tab: "medications",
                },
              }}
            >
              medications
            </Link>
          </TabsTrigger> */}
          <TabsTrigger value="injection">
            <Link
              href={{
                query: {
                  tab: "injection",
                },
              }}
            >
              injections
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="container mx-auto mt-8 px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-blue-500 text-white p-6">
                <h2 className="text-3xl font-bold">User Profile</h2>
                <p className="text-lg">Detailed Information</p>
              </div>
              <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4">
                  <h5 className="font-semibold">Full Name</h5>
                  <p>{profile?.fullname}</p>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Date of Birth</h5>
                  <p>{profile?.dob}</p>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Gender</h5>
                  <p>{profile?.gender}</p>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Phone</h5>
                  <p>{profile?.phone}</p>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Address</h5>
                  <p>{profile?.address}</p>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Next of Kin</h5>
                  <p>{profile?.nextofkin}</p>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Next of Kin Phone number</h5>
                  <p>{profile?.nextofphone}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="medicalrecord" className="">
          <div className="">
            {user?.user.role === UserRole.DOCTOR ? (
              <Link
                href={`/medical_record/${params.id}`}
                className="flex items-center justify-center "
              >
                <Button>Creat new file</Button>
              </Link>
            ) : (
              <p></p>
            )}
          </div>
          <div className="grid grid-cols-5 gap-4 content-center">
            {doctorsreport.map((med) => (
              <Doctors_Report {...med} />
            ))}
          </div>
        </TabsContent>
        {/* <TabsContent value="medications">
          <Link
            href={`/medication/${params.id}`}
            className="flex items-center justify-center "
          >
            <Button>Creat new file</Button>
          </Link>
          <div className="grid grid-cols-5 gap-4 content-center">
            {medication.map((med) => (
              <Medical_report {...med} />
            ))}
          </div>
        </TabsContent> */}
        <TabsContent value="injection">
          {user?.user.role === UserRole.NURSE ? (
            <Link
              href={`/injection/${params.id}`}
              className="flex items-center justify-center "
            >
              <Button>Creat new file</Button>
            </Link>
          ) : (
            <p></p>
          )}
          <div className="grid grid-cols-5 gap-4 content-center">
            {injection.map((med) => (
              <Injection {...med} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Patient;
