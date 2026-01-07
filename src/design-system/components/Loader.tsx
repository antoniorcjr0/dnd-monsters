import { Text } from "./Text";
import { cn } from "./utils";

type LoaderProps = {
  message?: string;
  className?: string;
};

export function Loader({ message = "Loading...", className }: LoaderProps) {
  return (
    <div className={cn("flex items-center gap-3 text-text-secondary", className)}>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-text-muted border-t-accent" />
      <Text variant="secondary" size="sm">
        {message}
      </Text>
    </div>
  );
}
