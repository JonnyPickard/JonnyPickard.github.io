import clsx from "clsx";
import React from "react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface EdgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  // right, down, left, up
  direction?: "R" | "D" | "L" | "U";
  size?: number;
}

export function Edge({ direction = "R", size = 32, className }: EdgeProps) {
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
        "p-0",
        "leading-none",
        "text-emerald-500",
        pickArrowRotationFromDirection(),
        className,
      ])}
    >
      <LiaLongArrowAltRightSolid size={size} />
    </span>
  );
}
