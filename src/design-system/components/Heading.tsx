import type { HTMLAttributes } from "react";
import { cn } from "./utils";

type HeadingSize = "xl" | "lg" | "md" | "sm";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingTag;
  size?: HeadingSize;
};

const sizeStyles: Record<HeadingSize, string> = {
  xl: "text-3xl",
  lg: "text-2xl",
  md: "text-xl",
  sm: "text-lg",
};

export function Heading({
  as: Component = "h2",
  size = "md",
  className,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-semibold leading-tight text-text-primary",
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
