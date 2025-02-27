import clsx from "clsx";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface EdgeProps {
  direction?: "L" | "R";
  size?: number;
}

export function Edge({ direction = "R", size = 32 }: EdgeProps) {
  return (
    <span
      className={clsx([
        "flex",
        "items-center",
        "justify-center",
        "p-1",
        "leading-none",
        "text-emerald-500",
        { "rotate-180": direction === "L" },
      ])}
    >
      <LiaLongArrowAltRightSolid size={size} />
    </span>
  );
}
