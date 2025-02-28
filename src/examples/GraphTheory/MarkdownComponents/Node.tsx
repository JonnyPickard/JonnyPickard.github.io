import clsx from "clsx";
import React from "react";

interface NodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
}

export function Node({ name, size = 32, className, ...props }: NodeProps) {
  return (
    <span
      className={clsx([
        "items-center",
        "flex",
        "justify-center",
        "rounded-full",
        "bg-indigo-600",
        "leading-none",
        "my-auto",
        "text-xs",
        "text-white",
        className,
      ])}
      style={{ width: size, height: size }}
      {...props}
    >
      {name}
    </span>
  );
}
