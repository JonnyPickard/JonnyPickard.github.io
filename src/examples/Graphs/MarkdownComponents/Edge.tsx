import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface EdgeProps {
  direction: "L" | "R";
}

export function Edge({ direction }: EdgeProps) {
  return (
    <span
      className="align-center flex h-12 w-12 justify-center rounded-full
        bg-indigo-600 p-4 leading-none"
    >
      <LiaLongArrowAltRightSolid />
    </span>
  );
}
