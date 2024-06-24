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

type prop = {
  id: string;
  report?: string;
  date?: Date;
  userId?: String;
  medication?: string;
};

export default function Medical_Report({
  id,
  date,
  userId,
  report,
  medication,
}: prop) {
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
            <DrawerTitle>Medical Report</DrawerTitle>
          </DrawerHeader>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
          {/* Your drawer content with potentially scrollable elements */}
          <div className="overflow-y-auto max-h-screen">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
              labore nesciunt minus ullam harum, sapiente amet, sit fugit odio
              voluptatem atque fuga inventore. Iusto eos id error deserunt
              laudantium repudiandae! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Alias labore nesciunt minus ullam harum,
              sapiente amet, sit fugit odio voluptatem atque fuga inventore.
              Iusto eos id error deserunt laudantium repudiandae! Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Alias labore
              nesciunt minus ullam harum, sapiente amet, sit fugit odio
              voluptatem atque fuga inventore. Iusto eos id error deserunt
              laudantium repudiandae! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Alias labore nesciunt minus ullam harum,
              sapiente amet, sit fugit odio voluptatem atque fuga inventore.
              Iusto eos id error deserunt laudantium repudiandae! Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Alias labore
              nesciunt minus ullam harum, sapiente amet, sit fugit odio
              voluptatem atque fuga inventore. Iusto eos id error deserunt
              laudantium repudiandae!
            </p>
            <p>
              <span className="text-emerald-400">{report}</span>
              <span className="text-orange-400">{medication}</span>
            </p>
          </div>

          {/* Add more content as needed */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
