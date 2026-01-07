import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-text-primary hover:bg-accent-strong focus-visible:outline-accent border border-transparent",
  secondary:
    "bg-surface-strong text-text-primary hover:bg-surface focus-visible:outline-accent border border-border",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface focus-visible:outline-accent border border-transparent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "shadow-sm",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
});
