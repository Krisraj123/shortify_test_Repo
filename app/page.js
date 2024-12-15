import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>Shortify</h2>
      <Button variant="destructive">Shortify</Button>
      <UserButton/>
    </div>
  );
}
