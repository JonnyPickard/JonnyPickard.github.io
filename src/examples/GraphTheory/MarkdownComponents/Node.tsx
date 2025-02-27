import clsx from "clsx";

interface NodeProps {
  name: string;
  size?: number;
}

export function Node({ name, size = 32 }: NodeProps) {
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
      ])}
      style={{ width: size, height: size }}
    >
      {name}
    </span>
  );
}
