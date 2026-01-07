import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader } from "@/design-system";
import { MonsterDetails } from "@/features/monsters/components";

type MonsterPageProps = {
  params: Promise<{ index: string }>;
};

export const metadata: Metadata = {
  title: "Monster Details",
  description: "View details for D&D 5e monsters.",
};

export default async function MonsterPage({ params }: MonsterPageProps) {
  const { index } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">
      <Suspense fallback={<Loader message="Summoning monster..." />}>
        <MonsterDetails index={index} />
      </Suspense>
    </main>
  );
}
