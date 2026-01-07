import { Card, Heading, Text } from "@/design-system";
import { cn } from "@/design-system/components/utils";
import type { MonsterListItem } from "../types";

type MonsterCardProps = {
  monster: MonsterListItem;
  className?: string;
};

export function MonsterCard({ monster, className }: MonsterCardProps) {
  return (
    <Card
      className={cn(
        "group flex flex-col gap-2 border-border bg-surface transition duration-150 hover:-translate-y-0.5 hover:border-accent hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 px-4 pt-4">
        <Heading as="h3" size="sm">
          {monster.name}
        </Heading>
        <span className="text-xs uppercase tracking-wide text-text-muted">
          {monster.index}
        </span>
      </div>
      <div className="px-4 pb-4">
        <Text variant="muted" size="sm" className="transition-colors group-hover:text-text-secondary">
          View details
        </Text>
      </div>
    </Card>
  );
}
