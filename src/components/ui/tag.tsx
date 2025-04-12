import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-md", 
  {
    variants: {
      variant: {
        default: "bg-secondary/80 text-secondary-foreground shadow-sm",
        highlight: "bg-gradient-to-br from-amber-500/15 to-amber-500/25 text-amber-600 dark:from-amber-500/25 dark:to-amber-500/35 dark:text-amber-400 font-semibold shadow-sm",
      },
      size: {
        default: "px-3 py-1 shadow-[0_2px_4px_var(--shadow-color)]",
        sm: "px-2.5 py-0.5 shadow-[0_1px_2px_var(--shadow-color)]",
        lg: "px-4 py-1.5 shadow-[0_2px_5px_var(--shadow-color)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size, className }))} {...props} />
  );
} 