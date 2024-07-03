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
import { Delete, FolderIcon } from "lucide-react";
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

// type prop {
//     id: String;
//     date: Date;
//     symptoms: String;
//     diagnosis: String;
//     labtest: String;
//     labtestresult: String;
//     prescription: String;
//     patientId: String;

//     docId: String;

// }

type prop = {
  id: string;
  injection: string;
  date: Date;
  patientId: string;
  nurseId: string;
};
// type prop = {
//     id: string;
//     medication: string;
//     date: Date;
//     patientId: string;
//     docId: string;
// };

export default function Injection({
  id,
  injection,
  date,
  patientId,
  nurseId,
}: prop) {
  return (
    <div key={id}>
      <Drawer>
        <DrawerTrigger>
          <div className="text-center flex flex-col justify-center items-center">
            <AiFillFolder className="text-8xl text-yellow-500" />
            <p className="text-center">{date?.toDateString()}</p>
          </div>
        </DrawerTrigger>

        <DrawerContent className="w-[800px] h-screen mx-auto p-8">
          <DrawerHeader>
            <DrawerTitle>injections</DrawerTitle>
          </DrawerHeader>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
          {/* Your drawer content with potentially scrollable elements */}
          <div className="list-disc pl-5">
            <div className="mb-2">
              <p>
                <strong>Medication:</strong> {injection}
              </p>
              <p>
                <strong>Date Given:</strong>{" "}
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
