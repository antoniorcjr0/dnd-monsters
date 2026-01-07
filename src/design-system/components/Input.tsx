import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "./utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leadingIcon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, leadingIcon, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2",
        "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent",
        className,
      )}
    >
      {leadingIcon ? <span className="text-text-muted">{leadingIcon}</span> : null}
      <input
        ref={ref}
        className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        {...props}
      />
    </div>
  );
});
