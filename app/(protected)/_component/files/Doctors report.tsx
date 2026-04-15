"use client";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AiFillFolder } from "react-icons/ai";

import { testing } from "@/actions/testing";
import { FolderIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Delete } from "@/actions/CrudForms";
import { useRouter } from "next/navigation";

type prop = {
  id: String;
  date: Date;
  symptoms: String;
  diagnosis: String;
  labtest: String | null;
  labtestresult: String | null;
  prescription: String | null;
  patientId: String;

  docId: String;
};

export default function Doctors_Report({
  id,
  date,
  symptoms,
  diagnosis,
  labtest,
  labtestresult,
  prescription,
  patientId,
  docId,
}: prop) {
  const router = useRouter();
  const onclick = (id: string, schema: string) => {
    Delete(id, schema);
    router.refresh();
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="text-center flex flex-col justify-center items-center">
            <AiFillFolder className="text-8xl text-yellow-500" />
            <p className="text-center">{date?.toDateString()}</p>
          </div>
        </DrawerTrigger>

        <DrawerContent className="w-[800px] h-screen mx-auto p-8">
          <DrawerHeader>
            <DrawerTitle>Doctors Report</DrawerTitle>
          </DrawerHeader>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
          {/* Your drawer content with potentially scrollable elements */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doctor&apos;s Report</h1>
            <p className="mb-4">
              <strong>Date:</strong> {new Date(date).toLocaleDateString()}
            </p>
            <p className="mb-4">
              <strong>Symptoms:</strong> {symptoms}
            </p>
            <p className="mb-4">
              <strong>Diagnosis:</strong> {diagnosis}
            </p>
            {labtest && (
              <p className="mb-4">
                <strong>Lab Test:</strong> {labtest}
              </p>
            )}
            {labtestresult && (
              <p className="mb-4">
                <strong>Lab Test Result:</strong> {labtestresult}
              </p>
            )}
            {prescription && (
              <p className="mb-4">
                <strong>Prescription:</strong> {prescription}
              </p>
            )}
          </div>
          <div>
            <DrawerClose>
              <Button
                variant="destructive"
                onClick={() => onclick(id as string, "doctorsreport")}
              >
                Delete
              </Button>{" "}
            </DrawerClose>
          </div>
          {/* Add more content as needed */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
