import type { HTMLAttributes } from "react";
import { cn } from "./utils";

type TextVariant = "primary" | "secondary" | "muted";
type TextSize = "md" | "sm";

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: TextVariant;
  size?: TextSize;
};

const variantStyles: Record<TextVariant, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
};

const sizeStyles: Record<TextSize, string> = {
  md: "text-base",
  sm: "text-sm",
};

export function Text({
  className,
  variant = "primary",
  size = "md",
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "leading-relaxed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
