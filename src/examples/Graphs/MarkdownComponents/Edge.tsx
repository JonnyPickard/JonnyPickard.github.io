import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface EdgeProps {
  direction?: "L" | "R";
}

export function Edge({ direction = "R" }: EdgeProps) {
  return (
    <span
      className={`flex items-center justify-center p-1 leading-none
      text-emerald-500 ${direction === "L" ? "rotate-180" : ""}`}
    >
      <LiaLongArrowAltRightSolid size={32} />
    </span>
  );
}
