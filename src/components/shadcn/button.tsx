import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out transform disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring dark:focus-visible:ring-offset-gray-800",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white shadow hover:bg-blue-400 hover:scale-105 focus-visible:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white",
        destructive:
          "bg-red-500 text-white shadow hover:bg-red-500 hover:scale-105 focus-visible:ring-red-600 dark:bg-red-700 dark:hover:bg-red-600",
        outline:
          "border border-gray-300 bg-gray-800 text-gray-100 shadow-sm hover:bg-gray-700 hover:scale-105 focus-visible:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600",
        secondary:
          "bg-emerald-500 text-white shadow hover:bg-emerald-400 hover:scale-105 focus-visible:ring-green-500 dark:bg-green-600 dark:hover:bg-green-500",
        ghost:
          "text-gray-300 hover:bg-gray-700 hover:scale-105 focus-visible:ring-gray-400 dark:text-gray-200 dark:hover:bg-gray-600",
        link: "text-blue-400 underline-offset-4 hover:underline hover:scale-105 focus-visible:ring-blue-500 dark:text-blue-300",
        rounded:
          "rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-400 hover:scale-105 focus-visible:ring-green-500 dark:bg-green-600 dark:hover:bg-green-500",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-sm",
        lg: "h-10 px-6 py-3 text-lg",
        icon: "p-1 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
