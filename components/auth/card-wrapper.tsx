"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  Label: string;
  backButtonLabel?: string;
  backbuttonHref?: string;
  showSocial?: boolean;
}
export const CardWrapper = ({
  children,
  headerLabel,
  Label,
  backButtonLabel,
  backbuttonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full md:w-[800px] shadow-md">
      <CardHeader>
        {" "}
        <Header label={Label} headerlabel={headerLabel} />{" "}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <CardFooter>{/*  <Social /> */}</CardFooter>}
      <CardFooter>
        {/* <BackButton href={backbuttonHref} label={backButtonLabel} /> */}
      </CardFooter>
    </Card>
  );
};
