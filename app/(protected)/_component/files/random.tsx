import React from "react";
import Link from "next/link";
import { Random } from "@prisma/client";

interface CardProps {
  key: string;
  item: Random; // Use the Post interface defined in cardList.tsx
}

const Card: React.FC<CardProps> = ({ key, item }) => {
  return (
    <div key={key}>
      <div>
        <p>{item.email}</p>
        <p>{item.name}</p>
      </div>
    </div>
  );
};

export default Card;
