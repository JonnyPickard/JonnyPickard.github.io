import { MatrixGrid } from "./MatrixGrid";

export interface GraphsProps {
  prop?: string;
}

export function Graphs({ prop = "default value" }: GraphsProps) {
  return (
    <div className="bg-slate-600 h-dvh">
      <div className="p-16">
        <MatrixGrid />
      </div>
    </div>
  );
}
