import type { HTMLAttributes } from "react";
import { cn } from "./utils";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("h-4 w-full animate-pulse rounded bg-surface-strong", className)}
      {...props}
    />
  );
}
