import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface IPokemon {
  id: string;
  name: string;
  email: string;
}

export default function PokemonCard({ id, name, email }: IPokemon) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="mt-2 flex justify-center items-center">
            <h2 className="text-md font-bold text-wrap text-center">{name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-md font-bold">{email}</h2>
        </CardContent>
      </Card>
    </>
  );
}
