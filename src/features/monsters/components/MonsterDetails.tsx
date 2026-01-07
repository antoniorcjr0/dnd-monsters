import Link from "next/link";
import Image from "next/image";
import { Card, Heading, Text, buttonBaseClasses, buttonVariants } from "@/design-system";
import { cn } from "@/design-system/components/utils";
import { getApiErrorMessage, isNotFoundError } from "../api/errors";
import { fetchMonsterByIndex } from "../api/monstersApi";
import type { MonsterAction, MonsterDetails as MonsterDetailsType, MonsterSpeed } from "../types";

type MonsterDetailsProps = {
  index: string;
};

const formatSpeed = (speed: MonsterSpeed) => {
  const entries = Object.entries(speed).filter(([, value]) => Boolean(value));
  return entries.map(([type, value]) => `${type}: ${value}`).join(" • ");
};

const AbilityGrid = ({ monster }: { monster: MonsterDetailsType }) => {
  const scores = [
    ["STR", monster.strength],
    ["DEX", monster.dexterity],
    ["CON", monster.constitution],
    ["INT", monster.intelligence],
    ["WIS", monster.wisdom],
    ["CHA", monster.charisma],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {scores.map(([label, value]) => (
        <Card key={label} className="flex flex-col gap-1 border-border bg-surface-strong p-3 text-center">
          <Text variant="muted" size="sm" className="tracking-wide">
            {label}
          </Text>
          <Text className="text-xl font-semibold text-text-primary">{value}</Text>
        </Card>
      ))}
    </div>
  );
};

const ActionsList = ({ actions }: { actions?: MonsterAction[] }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="space-y-3">
      <Heading as="h3" size="sm">
        Actions
      </Heading>
      <div className="space-y-3">
        {actions.map((action) => (
          <Card key={action.name} className="space-y-1 border-border bg-surface-strong p-4">
            <Heading as="h4" size="sm">
              {action.name}
            </Heading>
            <Text variant="secondary" size="sm">
              {action.desc}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

export async function MonsterDetails({ index }: MonsterDetailsProps) {
  let monster: MonsterDetailsType | null = null;
  let error: unknown = null;

  try {
    monster = await fetchMonsterByIndex(index);
  } catch (err) {
    error = err;
  }

  if (error) {
    if (isNotFoundError(error)) {
      return (
        <Card className="space-y-3 border-border bg-surface p-6">
          <Heading as="h2" size="md">
            Monster not found
          </Heading>
          <Text variant="secondary">The requested monster could not be located.</Text>
          <Link
            href="/monsters"
            className={cn(buttonBaseClasses, buttonVariants.secondary, "inline-flex w-full sm:w-auto text-center")}
          >
            Back to monsters
          </Link>
        </Card>
      );
    }

    return (
      <Card className="space-y-3 border-accent bg-surface p-6">
        <Heading as="h2" size="md" className="text-accent">
          Error loading monster
        </Heading>
        <Text variant="secondary">{getApiErrorMessage(error)}</Text>
        <Link
          href={`/monsters/${index}`}
          className={cn(buttonBaseClasses, buttonVariants.secondary, "inline-flex w-full sm:w-auto text-center")}
        >
          Retry
        </Link>
      </Card>
    );
  }

  if (!monster) {
    return null;
  }

  const armorClass = monster.armor_class.map((entry) => entry.value).join(", ");
  const speed = formatSpeed(monster.speed);
  const imageUrl = monster.image ? new URL(monster.image, "https://www.dnd5eapi.co").toString() : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Heading as="h1" size="lg">
            {monster.name}
          </Heading>
          <Text variant="secondary" size="sm">
            {monster.size} {monster.type} • {monster.alignment}
          </Text>
        </div>
        <Link
          href="/monsters"
          className={cn(buttonBaseClasses, buttonVariants.secondary, "w-full sm:w-auto text-center")}
        >
          Back to monsters
        </Link>
      </div>

      {imageUrl ? (
        <div className="flex justify-start">
          <Card className="overflow-hidden border-border bg-surface">
            <Image
              src={imageUrl}
              alt={monster.name}
              width={240}
              height={240}
              className="h-48 w-48 object-contain"
              loading="lazy"
              sizes="240px"
            />
          </Card>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="space-y-2 border-border bg-surface-strong p-4">
          <Heading as="h3" size="sm">
            Armor Class
          </Heading>
          <Text>{armorClass}</Text>
        </Card>
        <Card className="space-y-2 border-border bg-surface-strong p-4">
          <Heading as="h3" size="sm">
            Hit Points
          </Heading>
          <Text>
            {monster.hit_points} ({monster.hit_dice})
          </Text>
        </Card>
        <Card className="space-y-2 border-border bg-surface-strong p-4">
          <Heading as="h3" size="sm">
            Speed
          </Heading>
          <Text>{speed || "—"}</Text>
        </Card>
      </div>

      <Card className="space-y-4 border-border bg-surface p-5">
        <Heading as="h2" size="sm">
          Ability Scores
        </Heading>
        <AbilityGrid monster={monster} />
      </Card>

      {monster.actions && monster.actions.length > 0 ? (
        <Card className="space-y-4 border-border bg-surface p-5">
          <ActionsList actions={monster.actions} />
        </Card>
      ) : null}
    </div>
  );
}
