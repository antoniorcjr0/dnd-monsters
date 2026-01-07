import type { ReactNode } from "react";
import { Card } from "./Card";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { cn } from "./utils";

type EmptyStateProps = {
  title: string;
  message?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, message, action, className }: EmptyStateProps) {
  return (
    <Card className={cn("flex flex-col items-center gap-2 px-6 py-8 text-center", className)}>
      <Heading size="sm" className="text-text-secondary">
        {title}
      </Heading>
      {message ? (
        <Text variant="muted" size="sm">
          {message}
        </Text>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  );
}
