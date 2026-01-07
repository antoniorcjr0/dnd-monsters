import type { Metadata } from "next";
import { MonsterList } from "@/features/monsters/components";

export const metadata: Metadata = {
  title: "Monsters of Dungeons & Dragons",
  description: "Explore every creature from D&D 5e, from common foes to legendary threats.",
};

export default function MonstersPage() {
  return (
    <main className="flex flex-col gap-8">
      <MonsterList />
    </main>
  );
}
