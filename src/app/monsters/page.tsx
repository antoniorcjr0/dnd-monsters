import type { Metadata } from "next";
import { MonsterList } from "@/features/monsters/components";

export const metadata: Metadata = {
  title: "Monsters Codex",
  description: "Browse monsters from the D&D 5e SRD.",
};

export default function MonstersPage() {
  return (
    <main className="flex flex-col gap-8">
      <MonsterList />
    </main>
  );
}
