import type { Metadata } from "next";
import { MonsterList } from "@/features/monsters/components";

export const metadata: Metadata = {
  title: "Monsters Codex",
  description: "Browse monsters from the D&D 5e SRD.",
};

export default function MonstersPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <MonsterList />
    </main>
  );
}
