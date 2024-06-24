import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default async function Patient_profile() {
  return (
    <div>
      {" "}
      <div>
        <Card className="">
          <CardHeader>
            <CardTitle>PROFILE</CardTitle>
            <CardDescription>patients profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                defaultValue="OKOYE IKECHUKWU MICHEAL"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="AGE">AGE</Label>

              <Input id="AGE" defaultValue="35" disabled />
            </div>
            <div>
              <Label htmlFor="PHONENUMBER">PHONENUMBER</Label>

              <Input id="PHONENUMBER" defaultValue="09068091134" disabled />
            </div>
            <div>
              <Label htmlFor="allergies">ALLERGIES</Label>

              <Textarea id="allergies" defaultValue="none" disabled />
            </div>
            <div>
              <Label htmlFor="helleditarysickness">helleditarysickness</Label>

              <Textarea
                id="helleditarysickness"
                defaultValue="diabetes, high blood pressure"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="pastMarjorsurgeries">past Marjor surgeries</Label>

              <Textarea id="pastMarjorsurgeries" defaultValue="hynea" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
