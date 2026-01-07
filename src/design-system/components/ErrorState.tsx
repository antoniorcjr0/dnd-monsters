import type { ReactNode } from "react";
import { Card } from "./Card";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { cn } from "./utils";

type ErrorStateProps = {
  title: string;
  message?: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({ title, message, action, className }: ErrorStateProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-2 border border-accent bg-surface px-6 py-8 text-left",
        className,
      )}
    >
      <Heading size="sm" className="text-accent">
        {title}
      </Heading>
      {message ? (
        <Text variant="secondary" size="sm">
          {message}
        </Text>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  );
}
