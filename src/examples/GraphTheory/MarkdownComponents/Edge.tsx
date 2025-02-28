import clsx from "clsx";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface EdgeProps {
  // right, down, left, up
  direction?: "R" | "D" | "L" | "U";
  size?: number;
}

export function Edge({ direction = "R", size = 32 }: EdgeProps) {
  const pickArrowRotationFromDirection = () => {
    switch (direction) {
      case "R":
        return "";
      case "D":
        return "rotate-90";
      case "L":
        return "rotate-180";
      case "U":
        return "-rotate-90";
    }
  };

  return (
    <span
      className={clsx([
        "flex",
        "items-center",
        "justify-center",
        "p-1",
        "leading-none",
        "text-emerald-500",
        pickArrowRotationFromDirection(),
      ])}
    >
      <LiaLongArrowAltRightSolid size={size} />
    </span>
  );
}
